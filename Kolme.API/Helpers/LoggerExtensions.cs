namespace Kolme.API.Helpers;

public static class LoggerExtensions
{
    public static void LogException(this ILogger logger, Exception ex)
    {
        logger.LogError(ex, ex.Message);
    }
}
