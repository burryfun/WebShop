using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebShop.API.ViewModels;
using WebShop.Application.Services;
using WebShop.Domain.Models;

namespace WebShop.API.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AuthService _authService;

        public AccountController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("api/login")]
        public async Task<IActionResult> Login([FromBody] AuthenticateRequest request)
        {
            if (request == null || request.Email == "" || request.Password == "")
            {
                var res = new AuthenticateResponse(){ IsSuccess = false, Message = "Email or password is empty" };
                return BadRequest(res);
            }

            var response = await _authService.Authenticate(request, ipAddress());

            if (response.IsSuccess == false)
            {
                return Unauthorized(response);
            }

            setTokenCookieToResponse(response.RefreshToken);
            return Ok(response);

            //var account = await _authService.FindByEmailAsync(viewModel.Email);

            //if (account == null ||
            //    !await _authService.CheckPasswordAsync(account, viewModel.Password))
            //{
            //    Console.WriteLine(viewModel.Email, viewModel.Password);
            //    return Unauthorized(new LoginResponseViewModel { 
            //        Success = false, 
            //        Message = "Invalid Email or Password"
            //    });
            //}


            //var claims = new List<Claim>
            //{
            //    new Claim(ClaimTypes.Name, account.Email),
            //    new Claim(ClaimTypes.Role, account.Role.ToString()),
            //};

            //var claimsIdentity = new ClaimsIdentity(
            //    claims, CookieAuthenticationDefaults.AuthenticationScheme);

            //await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

            //return Ok(new LoginResponseViewModel
            //{
            //    Success = true,
            //    Message = "Login successfull"
            //});
        }

        [HttpPost("api/refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refresh-token"];
            var response = await _authService.RefreshToken(refreshToken, ipAddress());
            setTokenCookieToResponse(response.RefreshToken);

            return Ok(response);

        }

        [HttpPost("api/logout")]
        public async Task<IActionResult> Logout()
        {
            var token = Request.Cookies["refresh-token"];

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is required" });
            }

            await _authService.RevokeToken(token, ipAddress());

            foreach (var cookie in Request.Cookies.Keys)
            {
                Console.WriteLine(cookie);
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(-1)
            };
            Response.Cookies.Append("refresh-token", "", cookieOptions);

            return Ok(new { message = "Token revoked" });
        }

        [HttpPost("api/register")]
        public async Task<IActionResult> Register([FromForm] string email, [FromForm] string password)
        {
            var account = await _authService.CreateAsync(email, password);
            return Ok();
        }

        [HttpDelete("api/delete")]
        public async Task<IActionResult> DeleteAsync([FromForm] string email, [FromForm] string password)
        {
            var account = await _authService.FindByEmailAsync(email);

            if (account == null ||
                !await _authService.CheckPasswordAsync(account, password))
            {
                return Unauthorized(new LoginResponseViewModel
                {
                    Success = false,
                    Message = "Invalid Email or Password"
                });
            }

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            await _authService.Delete(email);

            return Ok("Your account deleted");
        }


        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }

        private void setTokenCookieToResponse(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refresh-token", refreshToken, cookieOptions);
        }
    }
}
