if (location.href.startsWith("https://github.com/"))
{
    // CONTROL BUTTONS
    var devlink = location.href.replace("https://github.com/", "https://github.dev/");
    var devbtn = '<a id="external-open" class="btn ml-2 d-none d-md-block" href="' + devlink + '" style="background: #35389f; color: #ffffff;">  Open in Github.dev</a>';

    var clonelink = "http://localhost:1592/" + location.href;
    var clonebtn = '<a id="external-open" class="btn ml-2 d-none d-md-block" href="' + clonelink + '" target="_blank" style="background: #9f3544; color: #ffffff;">  Clone</a>';

    var btnStr = clonebtn + devbtn;

    var container = document.querySelector('#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-main > div.file-navigation.mb-3.d-flex.flex-items-start');
    container.innerHTML = container.innerHTML + btnStr;


    // COLORFUL LANG BAR
    let itemStr = "div.BorderGrid-cell > div.mb-2 > span.Progress";
    let count = document.querySelector(itemStr).childElementCount;


    // Values
    let values = [];
    let positions = [];
    for (let i = 0; i < count; i++) {
        item = document.querySelector(itemStr).children[i];
        item.style.display = 'none';
        txt = item.ariaLabel;
        let percentage = parseFloat(txt.substring(txt.length - 4));
        values.push(percentage);
    }
    for (let i = 0; i < values.length; i++){
        let top = 0.0;
        for (let j = 0; j < i; j++) {
            top += values[j];
        }
        let half = (values[i] / 2);
        let pos = top + half;
        positions.push(pos);
        //console.log(pos)
    }


    // Colors
    let colors = [];
    for (let i = 0; i < count; i++) {
        item = document.querySelector(itemStr).children[i];
        color = item.style.backgroundColor;
        colors.push(color);
    }
    for (let i = 0; i < colors.length; i++){
        //console.log(colors[i])
    }


    // Build string
    let styleStr = "linear-gradient(90deg";
    for (let i = 0; i < count; i++) {
        styleStr += ", ";
        styleStr += colors[i];
        styleStr += " ";
        styleStr += positions[i];
        styleStr += "%";
    }
    styleStr += ")";


    // Apply color
    document.querySelector(itemStr).style.background = styleStr;
}