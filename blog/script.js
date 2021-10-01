function getUrlVars() {
    var vars = [], hash;
    if (window.location.href.indexOf('?') < 1) return []
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function () {
    const query = getUrlVars()
    console.log(query)
    const loadMD = (elementId, md, lenght, linkPage) => {
        $.ajax({
            url: `./page/${md}.md`,
            dataType: "text",
            async: true,
            success: (data) => {
                //console.log(data, data.length)
                if (lenght > 0) {
                    const trimp = data.slice(0, lenght)
                    const page = (linkPage) ? `<a href="?page=${md}"><span>${marked(trimp)}...</span></a>` : `<span>${marked(trimp)}</span>`
                    $(`#${elementId}`).append(page);
                } else { $(`#${elementId}`).append(`<div>${marked(data)}</div>`); }

            }
        });
    }
    if (query.length > 0) {
        console.log('load page')
        $('#pageList').css('display', 'none');
        console.log(query)
        loadMD('openPage',query['page'])
    } else {
        $.ajax({
            url: `pagelist.json`,
            dataType: "json",
            async: true,
            success: (data) => {
                //console.log(data)
                // const getMdpageproperty = data.find(e => e.name == md)
                // console.log(getMdpageproperty)
                data.forEach(element => {
                    if (!element.hidden) {
                        if (element.pinned) {
                            loadMD('pinpage', element.name, 180, true)
                        }
                        loadMD('allpage', element.name, 180, true)
                    }
                });

            }
        });
    }


    //loadMD('pinpage', 'test')
    //$('#pinpage').append(`<span>${marked('## *hai*')}</span>`);
});