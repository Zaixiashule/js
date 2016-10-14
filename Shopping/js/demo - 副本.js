window.onload=function(){
	if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {

                if (els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }
	var table=document.getElementById('cartTable');//购物车表格
	var tr=table.children[1].rows;//行
	var checkInputs=document.getElementsByClassName('check');//所有勾选框
	var checkAllInputs=document.getElementsByClassName('check-all');//全选框
	var selected = document.getElementById('selected'); //已选商品
	var selectedTotal=document.getElementById('selectedTotal');//已选商品数目
	var priceTotal=document.getElementById('priceTotal');//合计
	var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
	var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表
	//计算
    function getTotal(){
        var selected=0,price=0;
        for(var i=0;i<tr.length;i++){
        	if(tr[i].getElementsByTagName('input')[0].checked){
        		tr[i].className='on';
        		selected+=parseInt(tr[i].getElementsByTagName('input')[1].value);
        		price+=parseFloat(tr[i].cells[4].innerHTML);	
        	}
        	else{
        		tr[i].className='';
        	}
        }
        	selectedTotal.innerHTML=selected;//已选数目
        	priceTotal.innerHTML=price.toFixed(2);//合计
    }
	for(var i=0;i<checkInputs.length;i++){
		checkInputs[i].onclick=function(){
			if(this.className==='check-all check'){
				for(var j=0;j<checkInputs.length;j++){
					checkInputs[j].checked=this.checked;
				}
			}
			if(!this.checked){
				for(var k=0;k<checkAllInputs.length;k++){
					checkAllInputs[k].checked=false;
				}
			}
			getTotal();
		}
	}


}



