namespace Kolme.API.Models;

public class EmployeeLocationAssignment
{
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;

    public int LocationId { get; set; }
    public Location Location { get; set; } = null!;
}
