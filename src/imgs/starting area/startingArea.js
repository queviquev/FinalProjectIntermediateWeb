(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("startingArea",
{ "compressionlevel":-1,
 "height":15,
 "infinite":false,
 "layers":[
        {
         "id":2,
         "image":"..\/..\/..\/..\/..\/..\/..\/tilesets\/darkforest\/main_background.png",
         "imageheight":576,
         "imagewidth":1024,
         "name":"background",
         "offsetx":0.6666666666666,
         "offsety":1.13686837721616e-13,
         "opacity":1,
         "type":"imagelayer",
         "visible":true,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1073742073, 752, 753, 753, 753, 753, 753, 753, 753, 753, 752, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 753, 3221225788,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3221225759, 3221225758,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 157,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 187,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 249, 136, 2147483717, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 157,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 279, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 187,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 249, 189, 308, 0, 0, 0, 0, 232, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 182, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 279, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 213,
            189, 190, 191, 192, 193, 194, 195, 196, 189, 190, 191, 192, 193, 194, 195, 196, 189, 190, 191, 192, 305, 306, 307, 308, 0, 0, 0, 0, 0, 0, 2684354636, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 131, 132, 133, 134, 135, 136, 131, 132, 133, 134, 135, 136, 76, 0, 0, 0, 0, 0, 0, 0, 0, 69, 129, 110, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1073742380, 1073742377, 1073742378, 1073742379, 1073742373, 1073742374, 1073742375, 1073742376, 1073742317, 1073742318, 1073742319, 1073742320, 1073741932, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 0, 0, 138, 0, 0, 0, 0, 0, 0, 0, 0, 127,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 157, 0, 0, 286, 0, 0, 0, 0, 0, 0, 0, 0, 127,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 189, 190, 191, 192, 193, 194, 195, 196, 1610612874, 1610612904, 1610612874, 1610612874, 1610612904, 1610612934, 1610612964, 111, 112, 113, 0, 0, 0, 187, 0, 0, 0, 317, 318, 319, 320, 305, 306, 307, 308, 0],
         "height":15,
         "id":3,
         "name":"collision",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":64,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1073741923, 1073741924, 1073741925, 1073741926, 1073741927, 1073741928, 1073741929, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 1073741930, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 156, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 186, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 103, 106, 2147483687, 2147483686, 142, 143, 144, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 248, 0, 0, 0, 2147483716, 2147483715, 2147483714, 174, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 156, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 219, 159, 278, 0, 752, 752, 753, 2147483745, 2147483744, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 186, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 245, 246, 247, 248, 0, 0, 0, 309, 782, 782, 783, 0, 233, 234, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 181, 0, 217,
            159, 160, 161, 162, 163, 164, 165, 166, 159, 160, 161, 162, 163, 164, 165, 166, 159, 160, 161, 162, 275, 276, 277, 278, 0, 621, 622, 3221225998, 3221225997, 572, 261, 262, 263, 264, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 212, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 309, 622, 0, 0, 0, 516, 0, 2684354606, 101, 102, 103, 104, 105, 106, 101, 102, 103, 104, 105, 106, 46, 47, 0, 0, 0, 0, 0, 0, 0, 39, 99, 101, 102, 103, 104, 0, 0, 0, 242, 243,
            752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 562, 470, 471, 471, 473, 0, 546, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 78, 0, 0, 0, 0, 67, 68, 0, 0, 0, 111, 112, 113, 0, 0, 0, 272, 273,
            752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 592, 564, 0, 0, 0, 0, 0, 1073742348, 1073742349, 3221226063, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 0, 0, 96, 97, 752, 753, 108, 109, 0, 0, 0, 0, 0, 0, 214, 279,
            752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 621, 622, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1073742357, 1073742347, 1073742348, 1073742349, 1073742343, 1073742344, 1073742345, 1073742346, 1073742287, 1073742288, 1073742289, 1073742290, 3221225518, 1073741870, 2147483883, 0, 0, 126, 0, 782, 783, 0, 139, 258, 259, 260, 0, 0, 0, 248, 0,
            752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 651, 652, 649, 650, 650, 648, 649, 650, 163, 163, 164, 165, 166, 2147483811, 2147483810, 2147483809, 2147483808, 2147483807, 2147483754, 2147483753, 2147483752, 2147483751, 2147483750, 2147483749, 2147483748, 2147483747, 0, 0, 156, 0, 752, 753, 0, 287, 288, 289, 290, 275, 276, 277, 278, 0,
            752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 752, 682, 679, 680, 677, 678, 679, 680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 186, 0, 782, 783, 316, 317, 318, 319, 320, 305, 306, 307, 308, 309],
         "height":15,
         "id":1,
         "name":"collisionbackground",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":64,
         "x":0,
         "y":0
        }],
 "nextlayerid":4,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.11.2",
 "tileheight":16,
 "tilesets":[
        {
         "columns":30,
         "firstgid":1,
         "image":"..\/..\/..\/..\/..\/..\/..\/tilesets\/darkforest\/env_ground.png",
         "imageheight":480,
         "imagewidth":480,
         "margin":0,
         "name":"env_ground",
         "spacing":0,
         "tilecount":900,
         "tileheight":16,
         "tilewidth":16
        }, 
        {
         "columns":16,
         "firstgid":901,
         "image":"..\/..\/..\/..\/..\/..\/..\/tilesets\/darkforest\/wood_env.png",
         "imageheight":432,
         "imagewidth":256,
         "margin":0,
         "name":"wood_env",
         "spacing":0,
         "tilecount":432,
         "tileheight":16,
         "tilewidth":16
        }],
 "tilewidth":16,
 "type":"map",
 "version":"1.10",
 "width":64
});