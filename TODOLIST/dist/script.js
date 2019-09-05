var shoplist = {};
shoplist.name = "buylist";
shoplist.settime = "2019.08/25";
shoplist.list = [];

if (!!localStorage.getItem("myTask")) {
  shoplist.list = JSON.parse(localStorage.getItem("myTask"));
}

//資料動作分離 上資料下動作

//改  插入data-del-id='{{delid}}' // 這裡要再看一下
var item_html =
  "<li id={{id}} class='buy_item'>{{num}}.{{name}}<div class='price'>{{price}}</div><div id={{del_id}} data-delid={{del_item_id}} class='del_btn'>X</div></li>";

var total_html =
  "<li class='buy_item total'>總價<div class='price'>{{total}}</div></li>";
function show() {
  //先清除全部 新增不會重複 *2
  $("#item_list").html("");
  var total_price = 0;
  for (var i = 0; i < shoplist.list.length; i++) {
    // 這裡要再看一下
    var del_item_id = "del_buyitem_" + i;
    total_price += parseInt(shoplist.list[i].price);

    var current_item_html = item_html
      .replace("{{num}}", i + 1)
      .replace("{{name}}", shoplist.list[i].name)
      // 這裡要再看一下
      .replace("{{del_id}}", del_item_id)
      .replace("{{price}}", shoplist.list[i].price)
      .replace("{{del_item_id}}", i);
    $("#item_list").append(current_item_html);
    // 這裡要再看一下
    $("#" + del_item_id).click(function() {
      remove_item(parseInt($(this).attr("data-delid")));
    });
  }
  var current_total_html = total_html.replace("{{total}}", total_price);
  $("#item_list").append(current_total_html);
}

show();

$(".addbtn").click(function() {
  if($("#inputname").val().length===0){
    console.log('name是空的');
    return ;
  }
  
  if(/\D/.test($("#inputprice").val())){
    console.log('金錢要是數字');
    return ;
  }
  
  shoplist.list.push({
    name: $("#inputname").val(),
    price: $("#inputprice").val()
  });
  
  localStorage.setItem("myTask", JSON.stringify(shoplist.list));

  $("#inputname").val("");
  $("#inputprice").val("");

  show();
});
function remove_item(id) {
  shoplist.list.splice(id, 1);
  localStorage.setItem("myTask", JSON.stringify(shoplist.list));
  show();
}