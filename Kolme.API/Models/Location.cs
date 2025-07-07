namespace Kolme.API.Models;

public class Location
{
    public int LocationId { get; set; }
    public string Name { get; set; } = string.Empty;

    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    public ICollection<EmployeeLocationAssignment> EmployeeLocations { get; set; } = new List<EmployeeLocationAssignment>();
}
