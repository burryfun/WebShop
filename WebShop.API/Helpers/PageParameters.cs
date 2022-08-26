namespace WebShop.API.Helpers
{
    public class PageParameters
    {
        const int maxPageSize = 50;
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public PageParameters()
        {
            PageNumber = 1;
            PageSize = maxPageSize;
        }
        public PageParameters(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber < 1 ? 1 : pageNumber;
            PageSize = pageSize > maxPageSize ? maxPageSize : pageSize;
        }
    }
}
