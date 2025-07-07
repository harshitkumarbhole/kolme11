namespace Kolme.API.DTOs;

public class EmployeeListDTO
{
    public int EmployeeId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
}
