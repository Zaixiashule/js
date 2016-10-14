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
	var selected=document.getElementById('selected'); //已选商品
	var selectedTotal=document.getElementById('selectedTotal');//已选商品数目
	var priceTotal=document.getElementById('priceTotal');//合计
	var deleteAll=document.getElementById('deleteAll'); // 删除全部按钮
	var selectedViewList=document.getElementById('selectedViewList'); //浮层已选商品列表
	var foot=document.getElementById('foot');
	// 更新总数和总价格，已选浮层
    function getTotal(){
        var selected=0,price=0,htmlStr='';
        for(var i=0;i<tr.length;i++){
        	if(tr[i].getElementsByTagName('input')[0].checked){
        		tr[i].className='on';
        		selected+=parseInt(tr[i].getElementsByTagName('input')[1].value);
        		price+=parseFloat(tr[i].cells[4].innerHTML);
        		htmlStr+='<div><img src="'+tr[i].getElementsByTagName('img')[0].src+'"  /><span class="del" index="'+i+'">取消选择</span></div>'	
        	}
        	else{
        		tr[i].className='';
        	}
        }
        	selectedTotal.innerHTML=selected;//已选数目
        	priceTotal.innerHTML=price.toFixed(2);//合计
			selectedViewList.innerHTML=htmlStr;
			if(selected==0){
				foot.className='foot';
			}        	
    }
    // 计算单行价格
    function getSubTotal(tr){
    	var cells=tr.cells;
    	var price=parseFloat(cells[2].innerHTML);
    	var count=parseInt(tr.getElementsByTagName('input')[1].value);
        var SubTotal=cells[4];
        SubTotal.innerHTML=(price*count).toFixed(2); 
	}   
    // 点击选择框
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
	// 显示已选商品弹层
	selected.onclick=function(){
		if(foot.className=='foot'){
			if(selectedTotal.innerHTML!=0){
				foot.className='foot show';
			}
		}
		else{
			foot.className='foot';
		}
	}
	//已选商品弹层中的取消选择按钮
    selectedViewList.onclick=function(e){
    	// console.log(e);
    	var e=e||window.event;
        var el=e.srcElement;
    	if(el.className=='del'){
    		var input=tr[el.getAttribute('index')].getElementsByTagName('input')[0];
    		input.checked=false;
    		input.onclick();
    	}
    }
    //为每行元素添加事件
    for(var i=0;i<tr.length;i++){
    	//将点击事件绑定到tr元素
    	tr[i].onclick=function(e){
	    	var e=e||window.event;
	        var el=e.srcElement;
	        var cls=el.className;
	        var input=this.getElementsByTagName('input')[1];
	        var val=parseInt(input.value);
	        var reduce=this.getElementsByTagName('span')[1];
	        switch(cls){
	        	case 'add':
	        	input.value=val+1;
	        	reduce.innerHTML='-';
	        	getSubTotal(this);
	        	break;
	        	case 'reduce':
	        	if(val>1){
	        		input.value=val-1;
	        	}
	        	if(input.value<=1)
	        	{
	        		reduce.innerHTML='';
	        	}
	        	getSubTotal(this);
	        	break;
	        	case 'delete':
	        	var conf=confirm('确定删除此商品吗？');
	        	if(conf){
	        		this.parentNode.removeChild(this);
	        	}
	        	break;
	        	default:
	        	break;
	        }
	        getTotal();
    	}
    	// 给数目输入框绑定keyup事件
        tr[i].getElementsByTagName('input')[1].onkeyup=function () {
            var val=parseInt(this.value);
            var tr=this.parentNode.parentNode;
            var reduce=tr.getElementsByTagName('span')[1];
            if (isNaN(val)||val<=0){
                val=1;
            }
            if (this.value!=val) {
                this.value=val;
            }
            if(val<=1){
            	reduce.innerHTML='';
            }
            else{
            	reduce.innerHTML='-';
            }
            getSubTotal(tr); //更新小计
            getTotal(); //更新总数
        }
    }
    // 点击全部删除
    deleteAll.onclick=function(){
    	if(selectedTotal.innerHTML!=0){
    		var conf=confirm('确定删除所选商品吗？');
    		if(conf){
    			for(var i=0;i<tr.length;i++){
    				if(tr[i].getElementsByTagName('input')[0].checked){
    					tr[i].parentNode.removeChild(tr[i]);
    					i--;
    				}
    			}
    		}
    	}
    	else{
    		alert('请选择商品！');
    	}
    	getTotal();
    }
    checkAllInputs[0].checked=true;
    checkAllInputs[0].onclick();
}



