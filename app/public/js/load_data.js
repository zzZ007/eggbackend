$(function() {
  $.ajax({
    url: '/index.php?s=/api/shop/index',
    type: 'post',
    data: { goods_id },
    dataType: 'json',
    // beforeSend() {
    //   common.shadeClose('数据加载中...', false);
    // },
    success(datas) {
      common.close();
      document.title = datas.name;
      $('.goods_name').text(datas.name);
      $('.goods_img').attr('src', datas.img);

      $('.shop_price').append(datas.current_price);
      $('.max_shop_price').text('￥' + datas.max_shop_price);
      $('.zhe').append(datas.zhe);
      $('.sheng').append(datas.sheng);

      $('.buy_descript').html(datas.buy_descript);
      $('.buy_step_img').attr('src', datas.buy_step_img);
      $('.descript').html(datas.descript);
      $('.customer_service').html(datas.customer_service);
      $('input[name=gift_type]').val(datas.gift_type);
      $('.shop_price_input').val(datas.current_price);
      $('input[name=goods_price]').val(datas.current_price);
      product_arr = datas.products_arr;
      datas = init_spec_img(datas);
      init_video(datas);
      var html = template.render('spec_content_script', datas);

      // console.log(datas.spec_arr);
      // console.log(html);
      $('#spec_content').html(html);
      $('.chicunlist:eq(0) ul li:eq(0)').click();

      var html = template.render('spec_content_gift_script', datas);
      $('#gift').html(html);
      if (datas.spec_list && datas.spec_list.length > 0) {
        let spec_html = '';
        var item_price = new Array();
        let is_open_gift = 0;

        // 产品规格
        $(datas.spec_list).each(function(i, item) {

          item_price = item.split('_');
          not3chanpin.push(item_price[0]);
          spec_html += '<li onclick="pricea(this)" ';
          if (i == 0) {
            spec_html += 'class="mouon">';
          } else {
            spec_html += '>';
          }
          spec_html += '<input type="radio" name="product"';
          spec_html += 'id="a' + i + '"';
          spec_html += 'value="' + item_price[0] + '"';
          if (item_price.length >= 2) {
            spec_html += 'alt="' + item_price[1] + '"';
          } else {
            spec_html += 'alt="' + datas.shop_price + '"';
          }
          if (i == 0) {
            spec_html += 'checked=""';
            if (item_price[2] == 1) {
              is_open_gift = 1;

            } else {
              is_open_gift = 0;
            }
            $('input[name=is_has_gift]').val(is_open_gift);
          }
          spec_html += ' open_gift="' + item_price[2] + '" ';
          spec_html += ' />';
          spec_html += item_price[0];
          spec_html += '</li>';
        });
        $('.dxbox.red.spec_name').html(spec_html);
        $('.spec_name_div').css('display', 'block');
      }

      // 颜色
      if (datas.spec_color_list && datas.spec_color_list.length > 0) {
        let spec_color_html = '';
        $(datas.spec_color_list).each(function(i, item) {
          // not3chima.push('  ' + item);
          spec_color_html += '<li onclick="add_class(this)" ';
          // if(i == 0){
          //   spec_color_html += 'class="mouon">';
          // }else{
          spec_color_html += '>';
          // }

          spec_color_html += '<input type="radio" name="spec_color"';
          // if(i == 0){
          //   spec_color_html += 'checked=""';
          // }
          spec_color_html += 'value="' + item + '"/>' + item;
        });
        spec_color_html += '</li>';
        $('.dxbox.red.spec_color').html(spec_color_html);
        $('.spec_color_div').css('display', 'block');
      }

      // 尺寸
      if (datas.size_list && datas.size_list.length > 0) {
        let size_html = '';
        $(datas.size_list).each(function(i, item) {
          not3chima.push('  ' + item);
          size_html += '<li onclick="add_class(this)"';
          //  if(i== 0){
          //   size_html += 'class="mouon">';
          // }else{
          size_html += '>';
          // }
          size_html += '<input type="radio" name="chicun"';
          // if(i == 0){
          //   size_html += 'checked=""';
          // }
          size_html += 'value="' + item + '"/>' + item + '</li>';
        });
        $('.dxbox.red.spec_size').html(size_html);
        $('.spec_size_div').css('display', 'block');
      }

      // 计算价格
      const obj = $('input[name=product]:checked').parent();
      // pricea(obj);

      // 礼品模块
      if (datas.is_has_gift == 1) {

        is_has_gift = datas.is_has_gift;
      }
      console.log(datas.gift_info_list);
      //   //礼品规格
      if (datas.gift_info_list && datas.gift_info_list.length > 0) {
        let gift_spec_html = '';
        $(datas.gift_info_list).each(function(i, item) {

          item_price = item.split(',');
          gift_spec_html += '<li onclick="price_gift(this)" ';
          if (item_price.length >= 2) {
            gift_spec_html += 'alt="' + item_price[1] + '"';
          } else {
            gift_spec_html += 'alt="' + 0 + '"';
          }
          // if(i == 0){
          //   gift_spec_html += 'class="mouon">';
          // }else{
          gift_spec_html += '>';
          // }
          gift_spec_html += '<input type="radio" name="gift_product"';
          gift_spec_html += 'id="gift_a' + i + '"';
          gift_spec_html += 'value="' + item_price[0] + '"';
          if (item_price.length >= 2) {
            gift_spec_html += 'alt="' + item_price[1] + '"';
          } else {
            gift_spec_html += 'alt="' + 0 + '"';
          }
          // if(i == 0){
          //   gift_spec_html += 'checked=""';
          // }
          gift_spec_html += '/>';
          gift_spec_html += item_price[0];
          gift_spec_html += '</li>';
        });

        $('.dxbox.red.gift_spec_name').html(gift_spec_html);
        $('.gift_spec_name_div').css('display', 'block');
      }

      //  if(datas.gift_type == 1){
      //            //礼品颜色
      //            if(datas.spec_color_list && datas.spec_color_list.length > 0){
      //             spec_color_html = '';
      //             $(datas.spec_color_list).each(function(i,item){
      //              spec_color_html += '<li onclick="add_class(this)" ';
      //             //  if(i == 0){
      //             //   spec_color_html += 'class="mouon">';
      //             // }else{
      //               spec_color_html += '>';
      //             // }
      //             spec_color_html += '<input type="radio" name="gift_spec_color"';
      //             // if(i == 0){
      //             //   spec_color_html += 'checked=""';
      //             // }
      //             spec_color_html +=  'value="' + item + '"/>' + item + '</li>';
      //           });
      //             $('.dxbox.red.gift_spec_color').html(spec_color_html);
      //             $(".gift_spec_color_div").css('display','block');
      //           }

      //            //礼品尺寸
      //            if(datas.size_list && datas.size_list.length > 0){
      //             size_html = '';
      //             $(datas.size_list).each(function(i,item){
      //               size_html += '<li onclick="add_class(this)"';
      //              //  if(i== 0){
      //              //   size_html += 'class="mouon">';
      //              // }else{
      //               size_html += '>';
      //             // }
      //             size_html += '<input type="radio" name="gift_chicun"';
      //             // if(i == 0){
      //             //   size_html += 'checked=""';
      //             // }
      //             size_html +=  'value="' + item + '"/>' + item + '</li>';
      //           });
      //             $('.dxbox.red.gift_spec_size').html(size_html);
      //             $(".gift_spec_size_div").css('display','block');
      //           }

      //         }else{

      //         }
      if (is_has_gift == 1) {
        $('#gift').css('display', 'block');
        $('input[name=is_has_gift]').val(1);
        // var obj_gift = $("input[name=gift_product]:checked").parent();
        // price_gift(obj_gift);
      } else {
        $('#gift').css('display', 'none');
      }
      price_count();


      write_fahuo('fahuo');

      common.scollDown('fahuo', 3000);
      common.scollDown('pingjia', 3000);

    },
    error() {

    },

  });
  init_guess_list(cat_id);


});

function init_video(datas) {
  $('#J_video_player').attr('poster', datas.img);

}

function init_spec_img(datas) {
  console.log(datas);
  $(datas.spec_arr).each(function(index, item) {
    console.log(item);
    if (item.show_img == 1) {
      let spec_value = '';
      const value_img = new Array();
      for (let i = 0; i < item.value_list.length; i++) {
        spec_value = item.value_list[i];
        spec_value = item.id + ':' + spec_value + ';';
        for (const key in datas.products_arr) {
          console.log('key:' + key);
          console.log('spec_value:' + spec_value);
          console.log('i:index_of:' + key.indexOf(spec_value));
          if (key.indexOf(spec_value) != -1) {
            value_img[i] = datas.products_arr[key].icon;

          } else {

          }
        }

      }
      item.img_list = value_img;
    }
    datas.spec_arr[index] = item;
  });
  console.log(datas);
  return datas;
}
function init_guess_list(cat_id) {
  $.ajax({
    url: '/index.php?s=/api/shop/goods_list5',
    type: 'post',
    data: { cat_id },
    dataType: 'json',
    beforeSend() {
      // common.shadeClose('数据加载中...',false);
    },
    success(result) {
      common.close();
      console.log(result);
      if (result.status == 1) {
        let _html = '';
        console.log(result);
        _html = template.render('guess_script', result);
        console.log(_html);
        $('#guess').html(_html);
      }
    },
    error() {

    },
  });
}

function pay_choose(obj) {
  const pay_code = $(obj).attr('value');
  $('#pay_code').val(pay_code);
  if ($(obj).hasClass('mouon')) {
    return;
  }
  $('.car span').removeClass('mouon');
  $(obj).addClass('mouon');


}
function write_fahuo(id) {
  const people_info = new Array();
  people_info.push('张**（181****4055）在1');
  people_info.push('李**（153****3886）在3');
  people_info.push('赵**（189****4472）在7');
  people_info.push('刘**（158****1122）在9');
  people_info.push('周**（187****1144）在4');
  people_info.push('王**（130****7039）在10');
  people_info.push('秦**（136****3212）在15');
  people_info.push('朱**（150****0311）在20');
  people_info.push('吴**（138****3240）在12');
  people_info.push('谭**（133****4096）在18');
  let li = '';
  for (let i = 0; i < 10; i++) {
    li = '<li>' + people_info[i] + '分钟前订购了 ' + getfahuo() + '<font color="#FF0000">√</font></li>';
    $('#' + id + ' ul').append(li);
  }
}
function write_js(js_src) {
  const oHead = $('#fahuo');
  const oScript = document.createElement('script');
  oScript.type = 'text/javascript';
  oScript.src = js_src;
  oHead.append(oScript);
}

function getfahuo() {
  let not3str = '';
  if (not3chanpin.length != 0) { not3str = not3str + not3chanpin[Math.floor((Math.random() * not3chanpin.length))]; }
  if (not3yanse.length != 0) { not3str = not3str + not3yanse[Math.floor((Math.random() * not3yanse.length))]; }
  if (not3chima.length != 0) { not3str = not3str + not3chima[Math.floor((Math.random() * not3chima.length))]; }
  return not3str;
}
