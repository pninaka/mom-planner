# הפעלת פרויקט מתכנן האמא
# רענון PATH כדי שnpm/ng יהיו זמינים
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH', 'User')

Write-Host "🌸 מתכנן האמא - הפעלת הפרויקט" -ForegroundColor Magenta
Write-Host ""

$dotnetOk = Get-Command dotnet -ErrorAction SilentlyContinue
$nodeOk   = Get-Command node   -ErrorAction SilentlyContinue

if (-not $dotnetOk) {
    Write-Host "❌ .NET SDK לא מותקן! הורידי מ: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Red
    exit 1
}
if (-not $nodeOk) {
    Write-Host "❌ Node.js לא מותקן! הורידי מ: https://nodejs.org" -ForegroundColor Red
    exit 1
}

Write-Host "✅ .NET: $(dotnet --version)   Node: $(node --version)" -ForegroundColor Green
Write-Host ""

$root         = $PSScriptRoot
$backendPath  = "$root\MomPlannerAPI"
$frontendPath = "$root\mom-planner"

# Backend בחלון נפרד
Write-Host "▶ מפעיל Backend על פורט 5000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
  "-NoExit", "-Command",
  "`$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User'); cd '$backendPath'; dotnet run"
)

Start-Sleep -Seconds 4

# Frontend בחלון נפרד
Write-Host "▶ מפעיל Frontend על פורט 4200..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
  "-NoExit", "-Command",
  "`$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User'); cd '$frontendPath'; ng serve --open"
)

Write-Host ""
Write-Host "✨ הפרויקט מופעל!" -ForegroundColor Green
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "   Frontend: http://localhost:4200  (נפתח אוטומטית בדפדפן)" -ForegroundColor White
