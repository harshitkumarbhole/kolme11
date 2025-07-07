using Kolme.API.Helpers;

namespace Kolme.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly KolmeDbContext _context;
    private readonly ILogger<EmployeeController> _logger;

    public EmployeeController(KolmeDbContext context, ILogger<EmployeeController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<IEnumerable<EmployeeListDTO>> Get()
    {
        try
        {
            var employees = _context.Employees
                .Include(e => e.Department)
                .Include(e => e.JobTitle)
                .Select(e => new EmployeeListDTO
                {
                    EmployeeId = e.EmployeeId,
                    FullName = e.FirstName + " " + e.LastName,
                    Department = e.Department.Name,
                    JobTitle = e.JobTitle.Title
                })
                .ToList();
            return Ok(employees);
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    public ActionResult<EmployeeListDTO> Post(CreateEmployeeDTO dto)
    {
        try
        {
            var employee = new Employee
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                DepartmentId = dto.DepartmentId,
                JobTitleId = dto.JobTitleId,
                LocationId = dto.LocationId,
                DivisionId = dto.DivisionId,
                ReportingManagerId = dto.ReportingManagerId
            };
            _context.Employees.Add(employee);
            _context.SaveChanges();

            var result = new EmployeeListDTO
            {
                EmployeeId = employee.EmployeeId,
                FullName = employee.FirstName + " " + employee.LastName,
                Department = _context.Departments.Find(employee.DepartmentId)?.Name ?? string.Empty,
                JobTitle = _context.JobTitles.Find(employee.JobTitleId)?.Title ?? string.Empty
            };
            return CreatedAtAction(nameof(Get), new { id = employee.EmployeeId }, result);
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id}")]
    public ActionResult Put(int id, CreateEmployeeDTO dto)
    {
        try
        {
            var employee = _context.Employees.Find(id);
            if (employee == null) return NotFound();

            employee.FirstName = dto.FirstName;
            employee.LastName = dto.LastName;
            employee.DepartmentId = dto.DepartmentId;
            employee.JobTitleId = dto.JobTitleId;
            employee.LocationId = dto.LocationId;
            employee.DivisionId = dto.DivisionId;
            employee.ReportingManagerId = dto.ReportingManagerId;

            _context.SaveChanges();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        try
        {
            var employee = _context.Employees.Find(id);
            if (employee == null) return NotFound();

            _context.Employees.Remove(employee);
            _context.SaveChanges();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }
}
