interface Player {
    name: string;
}

class PlayerImpl implements Player{
    name: string;
}

let player = new  PlayerImpl();
player.name = 'Janusz';

console.log(player.name);