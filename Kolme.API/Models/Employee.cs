namespace Kolme.API.Models;

public class Employee
{
    public int EmployeeId { get; set; }
    public string EmployeeCode { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string MiddleName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string PreferredName { get; set; } = string.Empty;
    public string PreviousSurname { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public string BloodGroup { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string MotherName { get; set; } = string.Empty;
    public string FatherOrHusbandName { get; set; } = string.Empty;
    public string Relationship { get; set; } = string.Empty;
    public string StateOrRegion { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string Telephone { get; set; } = string.Empty;
    public string Mobile { get; set; } = string.Empty;

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
