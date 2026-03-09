$port = 3000
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($process) {
    Write-Host "✅ Dev server running on port $port (PID: $($process.OwningProcess))" -ForegroundColor Green
    Write-Host "  Agents should EDIT FILES ONLY (don't start new servers)" -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "❌ No dev server on port $port" -ForegroundColor Red
    Write-Host "  Safe to run: npm run dev" -ForegroundColor Green
    exit 1
}
