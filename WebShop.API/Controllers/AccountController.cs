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
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var response = await _authService.Register(request);
            
            if (response.IsSuccess == false)
            {
                return BadRequest(response);
            }
            else
            {
                return Ok(response);
            }
        }

        [HttpPost("api/delete")]
        [Authorize]
        public async Task<IActionResult> DeleteAsync([FromBody] DeleteRequest request)
        {
            var account = await _authService.FindByIdAsync(request.Id);

            if (account == null)
            {
                return BadRequest(new
                {
                    Success = false,
                    Message = "Invalid Id"
                });
            }

            await _authService.DeleteByIdAsync(request.Id);

            return Ok($"Account {request.Id} deleted");
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
