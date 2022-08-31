namespace WebShop.API.Helpers
{
    public class QueryParameters
    {
        const int maxPageSize = 50;
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string? SortBy { get; set; }
        public QueryParameters()
        {
            PageNumber = 1;
            PageSize = maxPageSize;
        }
        public QueryParameters(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber < 1 ? 1 : pageNumber;
            PageSize = pageSize > maxPageSize ? maxPageSize : pageSize;
        }
    }
}
