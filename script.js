function getUrlVars() {
  var vars = [], hash;
  if (window.location.href.indexOf('?') == -1) return null
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

$(document).ready(async function () {
  const urlSearch = new URLSearchParams(window.location.search)
  const param = Object.fromEntries(urlSearch.entries());

  console.log(urlSearch)
  console.log(param)
  // const creditavatar = $('#avatarImg span').get(0)
  // console.log(creditavatar.style.top)
  // $(document).bind('mousemove', function (e) {
  //     creditavatar.style.left = (e.pageX / 20) + 'px'
  //     creditavatar.style.top = (e.pageY / 10) + 'px'
  // });
  const json = await $.getJSON("./command.json")
  console.log(json)

  const loadCmd = (paramater) => {
    $('#cmdList').empty();
    $('#cmdList').append('<p>Commands list</p> <div id="cmd"></div>');
    switch (paramater.category) {
      case 'settings':
        json.settings.forEach(element => {
          $('#cmd').append(`<details>
          <summary>${element.name}</summary>
          <li>Description: ${element.description}</li>
          <li>Example: ${element.example}</li>
      </details>`);
        })
        break;

      case 'misc':
        json.misc.forEach(element => {
          $('#cmd').append(`<details>
            <summary>${element.name}</summary>
            <li>Description: ${element.description}</li>
            <li>Example: ${element.example}</li>
        </details>`);
        })
        break;

      default:
        json.music.forEach(element => {
          const usage = (element.usage) ? '<li>Usage: ' + element.usage + '</li>' : ''
          $('#cmd').append(`<details>
          <summary>${element.name}</summary>
          <li>Description: ${element.description}</li>
          ${usage}
          <li>Example: ${element.example}</li>
      </details>`);
        });
        break;

    }
  }
  loadCmd(param)
  $('#categoryMusic').click(() => loadCmd({ category: 'music' }));
  $('#categorySettings').click(() => loadCmd({ category: 'settings' }));
  $('#categoryMisc').click(() => loadCmd({ category: 'misc' }));
});