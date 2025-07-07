namespace Kolme.API.Models;

public class EmployeeModuleAssignment
{
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;

    public int ModuleId { get; set; }
    public Module Module { get; set; } = null!;
}
