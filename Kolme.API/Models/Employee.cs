namespace Kolme.API.Models;

public class Employee
{
    public int EmployeeId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public int DepartmentId { get; set; }
    public Department Department { get; set; } = null!;

    public int JobTitleId { get; set; }
    public JobTitle JobTitle { get; set; } = null!;

    public int LocationId { get; set; }
    public Location Location { get; set; } = null!;

    public int DivisionId { get; set; }
    public Division Division { get; set; } = null!;

    public int? ReportingManagerId { get; set; }
    public Employee? ReportingManager { get; set; }

    public ICollection<EmployeeRoleAssignment> EmployeeRoles { get; set; } = new List<EmployeeRoleAssignment>();
    public ICollection<EmployeeModuleAssignment> EmployeeModules { get; set; } = new List<EmployeeModuleAssignment>();
    public ICollection<EmployeeLocationAssignment> EmployeeLocations { get; set; } = new List<EmployeeLocationAssignment>();
}
