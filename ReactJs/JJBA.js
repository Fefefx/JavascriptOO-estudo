
let jonathan = new JoJo(null,'Phantom Blood',()=>{
    console.log('Overdrive');
});

let joseph = new JoJo(null, 'Battle Tendency');

let jotaro = new JoJo('Star Platinum', 'Stardust Crusaders',()=>{
    console.log('Ora Ora Ora Ora !');
});

joseph.setStand = 'Hermit Purple';
joseph.effectPhrase = () =>{
    console.log('Oh my God !');
};

let josuke = new JoJo('Crazy Diamond', 'Diamond is Unbreakable',()=>{
    console.log('Great');
});

let giorno = new JoJo('Golden Experience', 'Golden Wind');

giorno.standRequiem(true, 'GER');

let jolyne = new JoJo('Stone Free', 'Stone Ocean',()=>{
    console.log('Yare yare dawa');
});

let johnny = new JoJo(['Tusk act 1','Tusk act 2','Tusk act 3', 'Tusk act 4'], 'Steel Ball Run');

let Dio = new Antagonist('The world',['Phanton Blood','Battle Tendency'],()=>{
    console.log('MUDA MUDA MUDA MUDA !')
});