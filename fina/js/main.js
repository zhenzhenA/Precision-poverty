var mainPlatform = {
    init: function() {
        this.bindEvent();
        this.render(menu['fupinduixiang-manage']);
    },

    bindEvent: function() {
        var self = this;
        // 顶部大菜单单击事件
        $(document).on('click', '.pf-nav-item',
        function() {
            $('.pf-nav-item').removeClass('current');
            $(this).addClass('current');
            $('#pf-page').find('iframe').eq(0).attr('src', 'submain.html');

            // 渲染对应侧边菜单
            var m = $(this).data('menu');
            self.render(menu[m]);

        });

        $(document).on('click', '.tree li',
        function() {
            // $('.sub-sider-nav li').removeClass('current');
            // $(this).addClass('current');
            $('iframe').attr('src', $(this).data('src'));
        });

        $(document).on('click', '.pf-logout',
        function() {
            layer.confirm('您确定要退出吗？', {
                icon: 4,
                title: '确定退出' //按钮
            },
            function() {
                location.href = 'login.html';
            });
        });

        $(document).on('click', '.pf-modify-pwd',
        function() {
            $('#pf-page').find('iframe').eq(0).attr('src', 'pages/modify_pwd.html')
        });
    },

    render: function(menu) {
        var current, i, j, len, html = [];
        html.push('<ul>');
        for (i = 0, len = menu.title.length; i < len; i++) {        
            
            if(menu.title[i].menu){
                html.push('<li><span>' + menu.title[i].title + '</span>');
                html.push('<ul>');
                for (j = 0; j < menu.title[i].menu.length; j++) {
                    html.push('<li><span><i class="icon-plus-sign"></i>'+menu.title[i].menu[j].title+'</span>');
                    html.push('<ul>');
                    for (k = 0; k < menu.title[i].menu[j].menu.length; k++) {
                        if(menu.title[i].menu[j].menu[k].menu){
                            html.push('<li><span><i class="icon-plus-sign"></i>'+menu.title[i].menu[j].menu[k].title+'</span>');
                            html.push('<ul>');
                            for (g = 0; g < menu.title[i].menu[j].menu[k].menu.length; g++) {
                                html.push('<li data-src="'+menu.title[i].menu[j].menu[k].menu[g].href+'"><span><i class="icon-leaf"></i><a href="javascript:;">'+menu.title[i].menu[j].menu[k].menu[g].title+'</a></span></li>');
                            
                            }
                            html.push('</ul>');
                            html.push('</li>');
                        }else{
                           html.push('<li data-src="'+menu.title[i].menu[j].menu[k].href+'"><span>' + menu.title[i].menu[j].menu[k].title + '</span></li>'); 
                        }                       
                    }
                    html.push('</ul>');
                    html.push('</li>');
                }
                html.push('</ul>');
                html.push('</li>');
            }else{
                html.push('<li data-src="'+menu.title[i].href+'"><span>' + menu.title[i].title + '</span></li>');
            }   
        }
        html.push('</ul>');   
        $('.tree').html(html.join(''));

        //导航菜单目录树
        $('.tree li:has(ul)').addClass('parent_li');
        $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', '展开分支');
        $('.tree li > span').on('click', function (e) {
            $(this).parent('li:has(> ul > li > ul > li > ul > li)').addClass('lastbottom');
        });
        $('.tree li.parent_li > span').on('click', function (e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
            if (children.is(":hidden")){
                children.show('fast');
                $(this).attr('title', '折叠分支').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
            } else {
                children.hide('fast');
                $(this).parent('li').removeClass('lastbottom');
                $(this).attr('title', '展开分支').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');  
            }
            e.stopPropagation();
        });
    }
};

mainPlatform.init();
