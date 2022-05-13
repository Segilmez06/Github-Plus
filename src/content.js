if (location.href == "https://github.com/") {

}
else if (location.href.startsWith("https://github.com/")) {
    registerBtns();
    setLangBarColor();
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function registerBtns(){
    var devlink = location.href.replace("https://github.com/", "https://github.dev/");
    var devbtn = '<a id="external-open" class="btn ml-2 d-none d-md-block" href="' + devlink + '" style="background: #35389f; color: #ffffff;">  Open in Github.dev</a>';

    var clonelink = "http://localhost:1592/" + location.href;
    var clonebtn = '<a id="external-open" class="btn ml-2 d-none d-md-block" href="' + clonelink + '" target="_blank" style="background: #9f3544; color: #ffffff;">  Clone</a>';

    var btnStr = clonebtn + devbtn;

    var container = document.querySelector('#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-main > div.file-navigation.mb-3.d-flex.flex-items-start');
    container.innerHTML = container.innerHTML + btnStr;
}

function setLangBarColor(){
    let itemStr = "div.BorderGrid-cell > div.mb-2 > span.Progress";
    let count = document.querySelector(itemStr).childElementCount;

    if (count > 1){
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
}

function addTab(){
    var tabstrip = document.querySelector("#dashboard > div > tab-container > div.js-feeds-tabs.overflow-visible.UnderlineNav > ul");
    var btnStr = `<li role="presentation" data-view-component="true" class="d-inline-flex"><button data-hydro-click="{&quot;event_type&quot;:&quot;feeds.feed_click&quot;,&quot;payload&quot;:{&quot;click_target&quot;:&quot;feed.original_tab&quot;,&quot;originating_url&quot;:&quot;https://github.com/&quot;,&quot;user_id&quot;:33354718}}" data-hydro-click-hmac="215218a70fcc9b564ea887730c10398b5e151cb51e83149c2dbfebe9e028742a" id="feed-original" type="button" role="tab" aria-controls="panel-3" data-view-component="true" class="UnderlineNav-item" aria-selected="false" tabindex="-1"><span data-view-component="true">Starred</span></button></li>`;
    
    var itemCont = document.querySelector("#dashboard > div > tab-container");
    var contStr = `<div id="panel-3" role="tabpanel" tabindex="0" aria-labelledby="feed-original" data-view-component="true" style="height: 1000px; background: red;" hidden></div>`;

    while (tabstrip == undefined) {
        delay(150);
    }
    tabstrip.innerHTML = tabstrip.innerHTML + btnStr;
    itemCont.innerHTML = itemCont.innerHTML + contStr;

    var userContStr = "body > div.position-relative.js-header-wrapper > header > div.Header-item.position-relative.mr-0.d-none.d-md-flex > details > details-menu > div.header-nav-current-user.css-truncate > a > strong";
    var userCont = document.querySelector(userContStr);
    while (userCont == undefined) {
        delay(150);
    }
    var user = userCont.innerHTML;
    fetch(`https://api.github.com/users/${user}/starred`).then(res => console.log(res.json()));
}