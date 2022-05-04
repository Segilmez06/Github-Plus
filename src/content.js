if (location.href.startsWith("https://github.com/"))
{
    var devlink = location.href.replace("https://github.com/", "https://github.dev/");
    var devbtn = '<a id="external-open" class="btn ml-2 d-none d-md-block" href="' + devlink + '" style="background: #35389f; color: #ffffff;">  Open in Github.dev</a>';

    var clonelink = "http://localhost:1592/" + location.href;
    var clonebtn = '<a id="external-open" class="btn ml-2 d-none d-md-block" href="' + clonelink + '" target="_blank" style="background: #9f3544; color: #ffffff;">  Clone</a>';

    var btnStr = clonebtn + devbtn;

    var container = document.querySelector('#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-main > div.file-navigation.mb-3.d-flex.flex-items-start');
    container.innerHTML = container.innerHTML + btnStr;
}