namespace Kolme.API.Models;

public class JobTitle
{
    public int JobTitleId { get; set; }
    public string Title { get; set; } = string.Empty;

    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
