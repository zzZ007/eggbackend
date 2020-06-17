$(function() {
  $.fn.serializeObject = function() {
    const o = {};
    const a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [ o[this.name] ];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };
});
/*
* 通用请求
* */
function requestAjax(reqUrl, data, fuc, reload, btnId) {
  const tUrl = /* [[@{/}]]*/ reqUrl;
  if (btnId != null) {
    lockB(btnId);
  }
  if (reload == null) {
    reload = false;
  }
  $.ajax({
    type: 'post',
    url: tUrl,
    data,
    success(result) {
      if (result.code === 0) {
        toastr.success(result.msg);
        if (fuc != null) {
          fuc(result.data);
        }
        if (reload) {
          lazyReload(500);
        }
      } else {
        toastr.error(result.msg);
      }
      if (btnId != null) {
        unlockB(btnId);
      }
    },
    error(data) {
      toastr.error('请求错误');
      if (btnId != null) {
        unlockB(btnId);
      }
    },
  });
}

/*
* 通用跳转
* */
function jumpUrl(toUrl, curPage) {
  let url;
  if (toUrl.indexOf('?') > 0) { url = toUrl + '&page=' + curPage; } else { url = toUrl + '?page=' + curPage; }
  window.location.href = url;
}

/*
* 重载页面
* */
function lazyReload(interval) {
  if (interval == null || interval === 'undefined' || interval === '') {
    interval = 500;
  }
  setTimeout(function() {
    document.location.reload();
  }, interval);
}
/*
*锁定按钮
* */
function lockB(btnId) {
  $('#' + btnId).addClass('disabled');
}

/*
* 解锁按钮
* */
function unlockB(btnId) {
  $('#' + btnId).removeClass('disabled');
}

/*
* page状态更新
* */
function configPage(countPage, current, toUrl) {
  if (countPage <= 1) {
    $('#page').hide();
  } else {
    $('#page').show();
  }
  $('#page').pagination({
    pageCount: countPage,
    jump: true,
    current,
    coping: true,
    callback(api) {
      jumpUrl(toUrl, api.getCurrent());
    },
  });
}

/*
* 获取表单的JSON数据
* */
function formJson(obj) {
  return $('#' + obj).serializeObject();
}
