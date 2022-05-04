Add-Type -AssemblyName "System"
Add-Type -AssemblyName "System.IO"
Add-Type -AssemblyName "System.Net"
Add-Type -AssemblyName "System.Threading.Tasks"
Add-Type -AssemblyName "System.Windows.Forms"
Add-Type -AssemblyName "System.Drawing"

Write-Host "Github Plus client by Segilmez06"

$hostUrl = 'http://localhost:1592/'

$cloneHTML = '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Github Plus</title> <style>html, body{padding: 0; border: 0; margin: 0; height: 100%; width: 100%;}body{background-image: linear-gradient(45deg, #7b1d83, #0011ff);}.htitle{font-size: 30px; text-align: center; font-family: "Helvetica Neue",Helvetica,Arial; color: rgb(255, 255, 255); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}</style> <script>setTimeout(()=>{window.close();}, 750); </script></head><body> <h1 class="htitle">Cloning started. You can close this tab. Check for folder selection window.</h1></body></html>'
$healthMSG = "OK"

$dotnetVer = [System.Environment]::Version.ToString()
Write-Host "Using Dotnet version $dotnetVer"
Write-Host "Starting HTTP server"
$htmlListener = New-Object System.Net.HttpListener
$htmlListener.Prefixes.Add($hostUrl)
$htmlListener.Start()

while (1 -eq 1) {
    $httpContext = $htmlListener.GetContext()
    $httpResponse = $httpContext.Response
    $requestPath = $httpContext.Request.RawURL.ToString()

    $req = $requestPath.Substring(1)
    if ($req.StartsWith("KillGHPlusSession")) {
        Write-Host "Exit requested"
        $httpResponse.Close()
        $htmlListener.Stop()
        Exit
    }
    elseif ($req.StartsWith("CheckGHPlusSession")) {
        Write-Host "Check requested"
        $buffer = [Text.Encoding]::UTF8.GetBytes($healthMSG)
        $httpResponse.ContentLength64 = $buffer.length
        $httpResponse.OutputStream.Write($buffer, 0, $buffer.length)
    }
    elseif ($req.StartsWith("https://github.com/")) {
        $buffer = [Text.Encoding]::UTF8.GetBytes($cloneHTML)
        $httpResponse.ContentLength64 = $buffer.length
        $httpResponse.OutputStream.Write($buffer, 0, $buffer.length)

        $gitlink = $req
        Write-Host "Requested clone repo from $gitLink"
        Write-Host "Choosing folder to clone"
        $dialog = New-Object System.Windows.Forms.FolderBrowserDialog
        $dialog.Description = "Select a folder to clone the repo:"
        if ($dialog.ShowDialog() -eq "OK") {
            $path = $dialog.SelectedPath
            Write-Host "Selected directory is $path"
            Set-Location -Path $path
            Write-Host "Starting cloning"
            git clone $gitLink | Out-Null
            Write-Host "Done"
        }
        else {
            Write-Host "Canceled"
        }
    }
}