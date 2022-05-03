var link = location.href.replace("https://github.com/", "https://github.dev/");
var btn = '<a id="external-open" class="btn ml-2 d-none d-md-block" href="' + link + '" style="background: #35389f; color: #ffffff;">  Open in Github.dev</a>';
var container = document.querySelector('#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-main > div.file-navigation.mb-3.d-flex.flex-items-start');
container.innerHTML = container.innerHTML + btn;