(function(){

    /**
     * 改写ActorCommand，制作菜单时不调用防守和道具。（但防守和道具的逻辑都没删，没调用而已）
     */
    var _Window_ActorCommand_MakeCommandList = Window_ActorCommand.prototype.makeCommandList;
    Window_ActorCommand.prototype.makeCommandList = function(){
        if (this._actor) {
            //this.addAttackCommand();
            this.addSkillCommands();
            // this.addGuardCommand();停用防守
            // this.addItemCommand();
        }
    }

    /**
     * 符文，道具共用一个槽
     */

     // 关闭 槽ID必须和物品ID对应的检查
    Game_Actor.prototype.refresh = function() {
        // this.releaseUnequippableItems(false);
        Game_Battler.prototype.refresh.call(this);
    };
    // 同上，不过这个和数值修正有关，关掉过程数值才是正确的
    Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
        this._equips[slotId].setObject(item);
        // this.releaseUnequippableItems(true);
        this.refresh();
    };

    // 过程数值修正
    Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
        var newValue = this._tempActor.param(paramId);
        var diffvalue = newValue - this._actor.param(paramId);
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(newValue, x, y, 48, 'right');
    };
    

    // 修改slot名字，屏蔽掉:后的内容
    Window_EquipSlot.prototype.slotName = function(index) {
        var slots = this._actor.equipSlots();
        return this._actor ? $dataSystem.equipTypes[slots[index]].split(":")[0] : '';
    };


    var Window_EquipItem_SlotName = Window_EquipItem.prototype.slotName;
    Window_EquipItem.prototype.slotName = function(index) {
        var slots = this._actor.equipSlots();
        return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
    };
    
    Window_EquipItem.prototype.includes = function(item) {
        if (item === null) {
            return true;
        }

        var equipTypesTeam = [];
        $dataSystem.equipTypes.forEach(function(type,slotId){
            if(type.split(":")[1]){

                var name = type.split(":")[1];

                var team = equipTypesTeam.find(function(team){
                    return team.name === name
                })
                if(team){
                    team.member.push(slotId)
                }else {
                    equipTypesTeam.push({
                        name:name,
                        member:[slotId]
                    })
                }
            }
        })


        var teamName = this.slotName(this._slotId) ? this.slotName(this._slotId).split(":")[1] : null;
        var condition = item.etypeId !== this._actor.equipSlots()[this._slotId]
        if(teamName){
            var team = equipTypesTeam.find(function(team){
                return team.name === teamName
            })
            condition = !team.member.some(function(m){return m==item.etypeId})
        }
        if (this._slotId < 0 || condition) {
            return false;
        }
        return this._actor.canEquip(item);
    };


})()