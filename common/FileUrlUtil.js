const _ =  require('lodash');
const IdUtils = require('./IdUtils');

function coverUrl(project) {
    let coverImg = project.coverImg;
    if(!coverImg || (!coverImg.fileName && (!coverImg.url || _.trim(coverImg.url).length == 0))) {
        return 'http://7xl3tq.com1.z0.glb.clouddn.com/null.jpg?imageView/3/w/440/h/300|imageView/1/w/440/h/300';
    }
    if(coverImg.url) {
        return md5CoverUrl(project);
    }else {
        return 'http://7xl3tq.com1.z0.glb.clouddn.com/' + project.coverImg.fileName + '?imageView/3/w/440/h/300|imageView/1/w/440/h/300';
    }
}

function md5CoverUrl(project) {
    return md5ImageUrl(project.coverImg.url, project.type) + '?imageView2/0/w/440/h/300/format/jpg|imageView/3/w/440/h/300|imageView/1/w/440/h/300';
}

function md5ImageUrl(url, type) {
    url = _.replace(url, 'http://', '');
    url = _.replace(url, 'https://', '');
    url = url.substring(0, url.indexOf('?'));
    let fix = '';
    let i = url.lastIndexOf('.');
    if(i > -1 && (url.length - i) < 7) {
        fix = url.substring(i);
    }
    let host;
    switch (type) {
        case 'wechat':
            host = 'http://odfh1hy6p.bkt.clouddn.com/';
            break;
        case 'instagram':
            host = 'http://obbwgsq39.bkt.clouddn.com/';
            break;
        case 'facebook':
            host = 'http://obbw7h5df.bkt.clouddn.com/';
            break;
        case 'twitter':
            host = 'http://obbwqhrio.bkt.clouddn.com/';
            break;
        case 'website':
            host = 'http://obze8frs0.bkt.clouddn.com/';
            break;
    }
    return host + IdUtils.md5ByString(url) + fix;
}

function downloadUrl(project) {
    if(!project.downloadFile) return null;
    return 'http://7xl3tq.com1.z0.glb.clouddn.com/'+project.downloadFile.fileName+'?attname='+project.downloadName;
}

function downloadProjectFile(id) {
    $.get('/api/project/download/' + id, function(json){
        let iframe = $('#download-iframe');
        if(iframe.length == 0) {
            iframe= $('<iframe id="download-iframe"></iframe>').hide();
            $('body').append(iframe);
        }
        iframe[0].src = json.url;
    });
}

module.exports = {coverUrl, downloadUrl, downloadProjectFile, md5CoverUrl, md5ImageUrl};