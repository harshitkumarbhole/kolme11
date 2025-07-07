namespace Kolme.API.Models;

public class Division
{
    public int DivisionId { get; set; }
    public string Name { get; set; } = string.Empty;

    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
