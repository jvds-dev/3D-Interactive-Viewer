import * as main from './main.js'

// MODEL ======================================================
const boxObjectBtn = document.getElementById('box-object');
const sphereObjectBtn = document.getElementById('sphere-object');
const customObjectBtn = document.getElementById('custom-object');

boxObjectBtn.addEventListener('click', function(){
   changeObject(main.box);
});

sphereObjectBtn.addEventListener('click', function(){
    changeObject(main.sphere);
});

customObjectBtn.addEventListener('click', function(){
    changeObject(main.loadedObject);
});

function changeObject(object){
    main.scene.remove(main.activeObject);
    main.setActiveObject(object);
    main.scene.add(main.activeObject);
}



// MATERIAL ====================================================
const basicBtn = document.getElementById('basic-btn');
basicBtn.addEventListener('click', function(){
    main.changeMaterial(main.loadedObject, 'basic');
})
const lambertBtn = document.getElementById('lambert-btn');
lambertBtn.addEventListener('click', function(){
    main.changeMaterial(main.loadedObject, 'lambert');
})
const phongBtn = document.getElementById('phong-btn');
phongBtn.addEventListener('click', function(){
    main.changeMaterial(main.loadedObject, 'phong');
})
const standardBtn = document.getElementById('standard-btn');
standardBtn.addEventListener('click', function(){
    main.changeMaterial(main.loadedObject, 'standard');
})
const toonBtn = document.getElementById('toon-btn');
toonBtn.addEventListener('click', function(){
    main.changeMaterial(main.loadedObject, 'toon');
})
const depthBtn = document.getElementById('depth-btn');
depthBtn.addEventListener('click', function(){
    main.changeMaterial(main.loadedObject, 'depth');
})
const basiclineBtn = document.getElementById('basicline-btn');
basiclineBtn.addEventListener('click', function(){
    main.changeMaterial(main.loadedObject, 'basicline');
})
const dashedlineBtn = document.getElementById('dashedline-btn');
dashedlineBtn.addEventListener('click', function(){
    main.changeMaterial(main.loadedObject, 'dashedline');
})
const defaultBtn = document.getElementById('default-btn');
defaultBtn.addEventListener('click', function(){
    main.changeMaterial(main.loadedObject, 'default');
})


function toggleExpand(container, button){
    container.classList.toggle("expanded");
    if(container.classList.contains('expanded')){
        button.textContent='▴';
    }else{
        button.textContent='▾';
    }
}


// POSITION X,Y,Z ==============================================
const sl_toggle_position_btn = document.getElementById('sl-toggle-pos');
const sl_group_position = document.getElementById("sl-group-pos");
sl_toggle_position_btn.addEventListener('click', function(){
    toggleExpand(sl_group_position, sl_toggle_position_btn);
});



const sl_slide_X = document.getElementById("sl-posX");
const sl_slide_Y = document.getElementById("sl-posY");
const sl_slide_Z = document.getElementById("sl-posZ");
sl_slide_X.addEventListener("input", function(){
    main.sl.position.x = parseFloat(sl_slide_X.value);
});
sl_slide_Y.addEventListener("input", function(){
    main.sl.position.y = parseFloat(sl_slide_Y.value);
});
sl_slide_Z.addEventListener("input", function(){
    main.sl.position.z = parseFloat(sl_slide_Z.value);
});

// INTESITY ===================================================
const sl_toggle_intesity_btn = document.getElementById('sl-toggle-in');
const sl_group_intesity = document.getElementById("sl-group-in");
sl_toggle_intesity_btn.addEventListener('click', function(){
    toggleExpand(sl_group_intesity, sl_toggle_intesity_btn);
});

const sl_slide_intensity = document.getElementById("sl-in");
sl_slide_intensity.addEventListener("input", function(){
    main.sl.intensity = parseFloat(sl_slide_intensity.value);
})

// ANGLE =====================================================
const sl_toggle_angle_btn = document.getElementById('sl-toggle-ang');
const sl_group_angle = document.getElementById("sl-group-ang");
sl_toggle_angle_btn.addEventListener('click', function(){
    toggleExpand(sl_group_angle, sl_toggle_angle_btn);
});

const sl_slide_angle = document.getElementById("sl-ang");
sl_slide_angle.addEventListener("input", function(){
    main.sl.angle = parseFloat(Math.PI / sl_slide_angle.value);
})