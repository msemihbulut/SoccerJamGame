//canvas oluşturuluyor
const canvas = document.getElementById('soccerJamGame');
const ctx = canvas.getContext('2d');
//html sayfasında koyduğumuz butonları buradan kontrol edebiliyoruz
const startButton = document.getElementById('start');
const rulesButton = document.getElementById('rules');
//oyun esnasında çalacak müziği tanımlıyoruz
const music = new Audio('./audio/music.mp3');

//buradaki fonksiyonun amacı websitesi açıldığında eklediğimiz modüllerin (resim, müzik vs) düzgün çalışmasını ve yüklenmesini sağlamaktadır.
window.onload = function() {
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

//oyun başlatma butonuna basıldığı zaman butonları ekranda gizleyecek kod
startButton.addEventListener('click', () => 
    {
        startButton.style.display = 'none';
        rulesButton.style.display = 'none';
    });

//canvasımızın boyutlarını belirtiyoruz
canvas.width = innerWidth;
canvas.height = innerHeight;

/*oyuna başlama butonuna basıldıktan sonra çalıştıralacak fonksiyon. 
Bu fonksiyon oyun döngüsünü başlatmaktadır.*/
function startGame()
{
    setTimeout(gameLoop, 1000);
}

//oyunun kurallarını içeren fonksiyon
function gameRules()
{
    alert("-OYUN KURALLARI-\n1- Oyunun amacı rakip oyuncular arasından topu geçirerek hareket eden kaleye gol atmaktır.\n2- Rakip oyuncuları top ile vurarak hareket etmelerini engelleyebilirsiniz.\n3- 'A' ile sola, 'D' ile sağa hareket edebilrisiniz. Şut çekmek için 'space' tuşunu kullanabilirsiniz.\n4- Oyun sonsuza kadar devam etmektedir. Eğer yeniden başlamak istiyorsanız sayfayı yenileyebilirsiniz.\n5- Eğer oyunun yüklemesinde sıkıntı yaşıyorsanız sayfayı yenileyebilirsiniz.\n6- Kuralları anladıysanız 'Tamam' tuşuna basarak devam edebilirsiniz.");
}

//kontrol ettiğimiz karakterin class yapısını içermektedir
class Oyuncu
{
    constructor()
    {
        //karakterimizin resmi içeri aktarılıyor
        const image = new Image();
        image.src = './img/player.png';
        //karakterimizin boyutu güncelleniyor
        this.image = image;
        this.width = image.width * 0.5;
        this.height = image.height * 0.5;
        //karakterimizin canvas üzerindeki posizyonu belirleniyor
        this.position =
        {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height - 20
        }
        //karakterimizin eksenlerdeki hızı belirleniyor
        this.velocity =
        {
            x: 0,
            y: 0
        }
    }
    //karakterimiz canvas üzerinde gösteriliyor
    draw()
    {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    //karakterimizin pozisyounun güncelleyecek fonksiyon
    update()
    {
        if(this.image)
        {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }
    //karakterimizi herhangi bir olaydan sonra sıfırlayacak fonksiyon
    restart()
    {
        this.position =
        {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height - 20
        }
    }
}
//oluşturduğumuz oyuncu sınıf yapısından nesnemizi yaratıyoruz
const oyuncu = new Oyuncu();

//rakip oyuncuların sınıf yapısı tanımlanıyor
class Opponent
{
    constructor({ position })
    {
        //rakip oyuncunun resmi içeri aktarılıyor
        const image = new Image();
        image.src = './img/opponent.png';
        //rakip oyuncunun boyutu güncelleniyor
        this.image = image;
        this.width = image.width * 0.7;
        this.height = image.height * 0.7;
        //constructor'e gelen pozisyon değeri aktarılıyor
        this.position = position;
        //rakip oyuncunun hızı rastgele bir tam sayı ile belirleniyor
        this.velocity =
        {
            x: Math.floor(Math.random() * 5 + 4),
            y: 0
        }
    }
    //rakip oyuncu canvas üzerinde gösteriliyor
    draw()
    {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
     //rakip oyuncunun pozisyounun güncelleyecek fonksiyon
    update()
    {
        if(this.image)
        {
            this.draw();
            this.position.x += this.velocity.x;
            //buradaki if yapısı ile karakterlerin canvas dışına çıkmamasını sağlıyoruz
            if(this.position.x + this.width >= canvas.width || this.position.x <= 0)
            {
                this.velocity.x = -this.velocity.x;
            }
        }
    }
}
//oluşturduğumuz rakip oyuncu sınıf yapısından nesnelerimizi yaratıyoruz
const opponent1 = new Opponent({position:
                            {
                                x: Math.floor(Math.random() * 800 + 100 ),
                                y: Math.floor(Math.random() * 500 + 100 )
                            }});
const opponent2 = new Opponent({position:
                            {
                                x: Math.floor(Math.random() * 800 + 100 ),
                                y: Math.floor(Math.random() * 500 + 100 )
                            }});
const opponent3 = new Opponent({position:
                            {
                                x: Math.floor(Math.random() * 800 + 100 ),
                                y: Math.floor(Math.random() * 500 + 100 )
                            }});
const opponent4 = new Opponent({position:
                            {
                                x: Math.floor(Math.random() * 800 + 100 ),
                                y: Math.floor(Math.random() * 500 + 100 )
                            }});
const opponent5 = new Opponent({position:
                            {
                                x: Math.floor(Math.random() * 800 + 100 ),
                                y: Math.floor(Math.random() * 500 + 100 )
                            }});
const opponent6 = new Opponent({position:
                            {
                                x: Math.floor(Math.random() * 800 + 100 ),
                                y: Math.floor(Math.random() * 500 + 100 )
                            }});

//topun sınıf yapısı tanımlanıyor
class Ball
{
    constructor()
    {
        //topun resmi içeri aktarılıyor
        const image = new Image();
        image.src = './img/ballgame.png';
        //topun boyutu güncelleniyor
        this.image = image;
        this.width = image.width * 0.15;
        this.height = image.height * 0.15;
        //topun pozisyonu belirleniyor
        this.position =
        {
            x: oyuncu.position.x + 45,
            y: oyuncu.position.y + 45
        }
        //topun hızı belirleniyor
        this.velocity =
        {
            x: 0,
            y: 0
        }
    }
    //top canvas üzerinde gösteriliyor
    draw()
    {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    //topu sürekli güncelleyen fonksiyon
    update()
    {
        if(this.image)
        {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
    //topu herhangi bir olaydan sonra sıfırlayacak fonksiyon
    restart()
    {
        this.position =
        {
            x: oyuncu.position.x + 45,
            y: oyuncu.position.y + 50
        }
    }
}
//oluşturduğumuz ball sınıf yapısından nesnemizi yaratıyoruz
const ball = new Ball();

//kalenin sınıf yapısı tanımlanıyor
class Kale
{
    constructor()
    {
        //kalenin resmi içeri aktarılıyor
        const image = new Image();
        image.src = './img/net.png';
        //kalenin boyutu güncelleniyor
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        //kalenin canvas üzerindeki pozisyonu belirleniyor
        this.position =
        {
            x: canvas.width / 2 - image.width / 2,
            y: 0
        }
        //kalenin eksenlerdeki hızı belirleniyor
        this.velocity =
        {
            x: 5,
            y: 0
        }
    }
    //kale canvas üzerinde gösteriliyor
    draw()
    {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    //kaleyi sürekli güncelleyen fonksiyon
    update()
    {
        if(this.image)
        {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            if(this.position.x + this.width >= canvas.width || this.position.x <= 0)
            {
                this.velocity.x = -this.velocity.x;
            }
        }
    }
    //kaleyi herhangi bir olaydan sonra sıfırlayacak fonksiyon
    restart()
    {
        this.position =
        {
            x: canvas.width / 2 - this.image.width / 2,
            y: 0
        }

        this.velocity =
        {
            x: Math.floor(Math.random() * 5 + 4),
            y: 0
        }
    }
}
//oluşturduğumuz kale sınıf yapısından nesnemizi yaratıyoruz
const kale = new Kale();

//oyuncunun topa sahip olmadığını kontrol eden boolean değişken
let oyuncuTopaSahip = true;

//tus degiskenleri atanıyor ve basılıp basılmadığını kontrol eden boolean değerler konuluyor
const tuslar = 
{
    a:
    {
        pressed: false
    },
    d:
    {
        pressed: false
    },
    space:
    {
        pressed: false
    },
}

//herhangi bir olaydan sonra oyunu resetleyecek fonksiyon. oyuncu, top ve kale resetlenir.
function gameRestart()
{
    oyuncu.restart();
    ball.restart();
    kale.restart();
    oyuncuTopaSahip = true;
}

//çekilen şut gol olursa ekranda çıkacak yazının fonksiyonu
function goalText()
{
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GOOOOOOOLLLLLLL!", canvas.width/2, canvas.height/2);
}

//çekilen şut gol olmazsa ekranda çıkacak yazının fonksiyonu
function missedText()
{
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("KAÇIRDIN! TEKRAR DENE!", canvas.width/2, canvas.height/2);
}

//oyuncu şutunu çektikten sonra gol olup olmadığını kontrol eden fonksiyon
function isGoal()
{
    //şutun çekildiğini buradaki if ile algılıyoruz
    if(!oyuncuTopaSahip)
    {
        //topun gol olduğunu kontrol eden if yapısı
        if(ball.position.x >= kale.position.x 
            && ball.position.x + ball.width <= kale.position.x + kale.width 
            && ball.position.y + ball.height <= kale.position.y + kale.height
            && ball.position.y + ball.height >= kale.position.y - kale.height)
        {
            console.log("gol");
            kale.velocity.x = 0;
            ball.velocity.y = 0;
            goalText();
            setTimeout(gameRestart, 2500);
        }
        //topun gol olmadığını kontrol eden fonksiyon
        else if(ball.position.y + ball.height < kale.position.y + kale.height
                && ball.position.y > kale.position.y)
        {
            if(ball.position.x + ball.width < kale.position.x)
            {
                console.log("gol degil");
                kale.velocity.x = 0;
                ball.velocity.y = 0;
                missedText();
                setTimeout(gameRestart, 2500);
            }
            else if(ball.position.x > kale.position.x + kale.width)
            {
                console.log("gol degil");
                kale.velocity.x = 0;
                ball.velocity.y = 0;
                missedText();
                setTimeout(gameRestart, 2500);
            }
        }
        //buradaki bütün else if yapıları rakip oyuncuların top ile temas edip etmediğini kontrol etmektedir.
        else if(ball.position.x >= opponent1.position.x 
            && ball.position.x + ball.width <= opponent1.position.x + opponent1.width 
            && ball.position.y + ball.height <= opponent1.position.y + opponent1.height
            && ball.position.y + ball.height >= opponent1.position.y - opponent1.height)
        {
            console.log("gol degil");
            kale.velocity.x = 0;
            ball.velocity.y = 0;
            opponent1.velocity.x = 0;
            missedText();
            setTimeout(gameRestart, 2500);
        }

        else if(ball.position.x >= opponent2.position.x 
            && ball.position.x + ball.width <= opponent2.position.x + opponent2.width 
            && ball.position.y + ball.height <= opponent2.position.y + opponent2.height
            && ball.position.y + ball.height >= opponent2.position.y - opponent2.height)
        {
            console.log("gol degil");
            kale.velocity.x = 0;
            ball.velocity.y = 0;
            opponent2.velocity.x = 0;
            missedText();
            setTimeout(gameRestart, 2500);
        }

        else if(ball.position.x >= opponent3.position.x 
            && ball.position.x + ball.width <= opponent3.position.x + opponent3.width 
            && ball.position.y + ball.height <= opponent3.position.y + opponent3.height
            && ball.position.y + ball.height >= opponent3.position.y - opponent3.height)
        {
            console.log("gol degil");
            kale.velocity.x = 0;
            ball.velocity.y = 0;
            opponent3.velocity.x = 0;
            missedText();
            setTimeout(gameRestart, 2500);
        }
        else if(ball.position.x >= opponent4.position.x 
            && ball.position.x + ball.width <= opponent4.position.x + opponent4.width 
            && ball.position.y + ball.height <= opponent4.position.y + opponent4.height
            && ball.position.y + ball.height >= opponent4.position.y - opponent4.height)
        {
            console.log("gol degil");
            kale.velocity.x = 0;
            ball.velocity.y = 0;
            opponent4.velocity.x = 0;
            missedText();
            setTimeout(gameRestart, 2500);
        }
        else if(ball.position.x >= opponent5.position.x 
            && ball.position.x + ball.width <= opponent5.position.x + opponent5.width 
            && ball.position.y + ball.height <= opponent5.position.y + opponent5.height
            && ball.position.y + ball.height >= opponent5.position.y - opponent5.height)
        {
            console.log("gol degil");
            kale.velocity.x = 0;
            ball.velocity.y = 0;
            opponent5.velocity.x = 0;
            missedText();
            setTimeout(gameRestart, 2500);
        }
        else if(ball.position.x >= opponent6.position.x 
            && ball.position.x + ball.width <= opponent6.position.x + opponent6.width 
            && ball.position.y + ball.height <= opponent6.position.y + opponent6.height
            && ball.position.y + ball.height >= opponent6.position.y - opponent6.height)
        {
            console.log("gol degil");
            kale.velocity.x = 0;
            ball.velocity.y = 0;
            opponent6.velocity.x = 0;
            missedText();
            setTimeout(gameRestart, 2500);
        }
    }
}

//oyuncumuzun tuşlarla hareket ettiği fonksyion
function playerMovement()
{
    //oyuncu topa sahip ise hareket edebiliyor
    if(oyuncuTopaSahip)
    {
        if(tuslar.a.pressed && oyuncu.position.x >= 0)
        {
            oyuncu.velocity.x = -7;
            ball.velocity.x = -7;
        }
        else if(tuslar.d.pressed && oyuncu.position.x + oyuncu.width + ball.width <= canvas.width)
        {
            oyuncu.velocity.x = 7;
            ball.velocity.x = 7;
        }
        else
        {
            oyuncu.velocity.x = 0;
            ball.velocity.x = 0;
        }
    }
    //eğer sahip değilse hareket edemiyor
    else
    {
        oyuncu.velocity.x = 0;
        ball.velocity.x = 0;
    }
}

//oyun döngüsünün çalıştığı fonksiyon. her bir özellik burada kontrol ediliyor
function gameLoop()
{
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    music.play();
    oyuncu.update();
    ball.update();
    kale.update();
    opponent1.update();
    opponent2.update();
    opponent3.update();
    opponent4.update();
    opponent5.update();
    opponent6.update();
    playerMovement();
    isGoal();
}

//keydown ve keyup ile tuşlara basılıp basılmadığı kontrol ediliyor.
addEventListener('keydown', ({ key }) =>
{
    switch( key )
    {
        case 'a':
            console.log("left");
            tuslar.a.pressed = true;
            break;
        case 'A':
            console.log("left");
            tuslar.a.pressed = true;
            break;
        case 'd':
            console.log("right");
            tuslar.d.pressed = true;
            break;
        case 'D':
            console.log("right");
            tuslar.d.pressed = true;
            break;
        case ' ':
            console.log("shoot");
            ball.velocity.y = -10;
            oyuncuTopaSahip = false;
            break;
    }
})
addEventListener('keyup', ({ key }) =>
{
    switch( key )
    {
        case 'a':
            tuslar.a.pressed = false;
            break;
        case 'A':
            tuslar.a.pressed = false;
            break;
        case 'd':
            tuslar.d.pressed = false;
            break;
        case 'D':
            tuslar.d.pressed = false;
            break;
    }
})