namespace Kolme.API.DTOs;

public class CreateEmployeeDTO
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public int DepartmentId { get; set; }
    public int JobTitleId { get; set; }
    public int LocationId { get; set; }
    public int DivisionId { get; set; }
    public int? ReportingManagerId { get; set; }
}
