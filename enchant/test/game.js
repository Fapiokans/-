sc_x = window.innerWidth;
sc_y = window.innerHeight;
enchant();
window.onload = function () {
	const game = new Game(sc_x,sc_y);
	game.fps=120;
	game.preload(['https://media.discordapp.net/attachments/913725588349517844/923594187952238614/tapi.png']);
	game.preload(['https://media.discordapp.net/attachments/913725588349517844/923596951642058822/rice.png']);
	game.preload(['https://media.discordapp.net/attachments/913725588349517844/923238705995587634/back.png']);
	game.onenterframe = function () {
		fps = game.actualFps
	}
	game.onload = function () {
		//オブジェクト
		let back_1 = new Sprite(1000,1000);
		back_1.image = game.assets['https://media.discordapp.net/attachments/913725588349517844/923238705995587634/back.png'];
		back_1.scale(sc_x/1000,sc_y/1000);
		back_1.moveTo(sc_x/2-1000/2,sc_y/2-1000/2);
		
		let tapi = new Sprite(192,108);
		tapi.image = game.assets['https://media.discordapp.net/attachments/913725588349517844/923594187952238614/tapi.png'];
		tapi.moveTo(sc_x/2-192/2,sc_y/2-108/2);
		
		let rice = [];
		let rice_image = game.assets['https://media.discordapp.net/attachments/913725588349517844/923596951642058822/rice.png'];
		let riceno=0;
		
		let v = new Label();
		v.font = "40px Anton";
		v.y=sc_y-40;
		v.width = 1000;
		v.color = "blue";
		v.text="ver-0.0.0_BETA";
		
		let start_text = new Label();
		start_text.font = "24px Dela Gothic One";
		start_text.text = "タピオカランド";
		start_text.moveTo((sc_x - start_text._boundWidth)/2,sc_y/2);
		start_text.ontouchend = function() {
			game.replaceScene(home);
		};
		
		//スクリーン
		const start = new Scene();
		const home = new Scene();
		let rice_move=[];
		let rice_speed = [];
		let rice_count = 0;
		let tapi_rice_no = 0;
		home.ontouchmove = function(speed) {
			//餌の移動速度
			rice_move_end = [speed.x-rice_move[0],speed.y-rice_move[1]];
			rice_move = [speed.x,speed.y];
		}
		home.ontouchend = function(e) {
			//餌
			rice[riceno] = new Sprite(128,128);
			rice[riceno].image = rice_image;
			rice[riceno].scale(64/sc_x,64/sc_x);
			rice[riceno].moveTo(e.x-64,e.y-64);
			rice_speed[riceno] = rice_move_end;
			home.addChild(rice[riceno]);
			riceno++;
			rice_count++;
		};
		home.onenterframe = function () {
			if(rice_count==0){
			}else{
				if(tapi_rice_no<riceno){
				if(rice[tapi_rice_no].x>tapi.x){
					tapi.x+=80/fps;
				}else if(rice[tapi_rice_no].x<tapi.x){
					tapi.x-=80/fps;
				}
				if(rice[tapi_rice_no].y>tapi.y){
					tapi.y+=80/fps;
				}else if(rice[tapi_rice_no].y<tapi.y){
					tapi.y-=80/fps;
				}
				if(rice[tapi_rice_no].intersect(tapi)){
					home.removeChild(rice[tapi_rice_no]);
					tapi_rice_no++;
				}}
			}
			for(let i =0;i<riceno;i++){
				rice[i].x += rice_speed[i][0]/fps;
				rice[i].y += rice_speed[i][1]/fps;
				if(rice[i].x<-64){
					rice_speed[i][0]*=-1;
				}
				if(rice[i].y<-64){
					rice_speed[i][1]*=-1;
				}
				if(rice[i].x>sc_x-64){
					rice_speed[i][0]*=-1;
				}
				if(rice[i].y>sc_y-64){
					rice_speed[i][1]*=-1;
				}
			}
		}
		
		//ほんへ
		//スタート画面
		game.pushScene(start);
		start.addChild(back_1);
		start.addChild(v);
		start.addChild(start_text);
		
		//ホーム
		home.addChild(tapi);
		
	};
	game.start();
};