(function () {

    //=============================================================================
    /*:
    * @plugindesc DF通用脚本 - 菜单屏蔽
    * @author 明火暗雷
    *
    * @param isAttackDisable
    * @desc  是否禁用【攻击】指令，如果值为“Disable”则在战斗菜单界面不显示【攻击】指令，其余任何值都会使【攻击】指令显示出来。
    * @default Disable
    *
    * @param isDefendDisable
    * @desc  是否禁用【防御】指令，如果值为“Disable”则在战斗菜单界面不显示【防御】指令，其余任何值都会使【防御】指令显示出来。
    * @default Disable
    *
    * @param isSkillsDisable
    * @desc  是否禁用【技能】指令，如果值为“Disable”则在战斗菜单界面不显示【技能】指令，其余任何值都会使【技能】指令显示出来。
    * @default Disable
    *
    * @param isItemsDisable 
    * @desc  是否禁用【物品】指令，如果值为“Disable”则在战斗菜单界面不显示【物品】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
    *
    * @help
    * ============================================================================
    * Introduction
    * ============================================================================
    *
    * 
    *
    * ============================================================================
    * Plugin Commands
    * ============================================================================
    *
    * 
    *
    */
    //=============================================================================


    var BMCL = BMCL || {};
    BMCL.parameters = PluginManager.parameters('DF_BattleMenuCommandList');
    BMCL.params = BMCL.params || {};

    BMCL.params.isShow_AttackCommand = BMCL.parameters['isAttackDisable'];
    BMCL.params.isShow_DefendCommand = BMCL.parameters['isDefendDisable'];
    BMCL.params.isShow_SkillsCommand = BMCL.parameters['isSkillsDisable'];
    BMCL.params.isShow_ItemsCommand  = BMCL.parameters['isItemsDisable '];

    /**
     * 改写ActorCommand，制作菜单时不调用防守和道具。（但防守和道具的逻辑都没删，没调用而已）
     */
    var _Window_ActorCommand_MakeCommandList = Window_ActorCommand.prototype.makeCommandList;
    Window_ActorCommand.prototype.makeCommandList = function () {
        if (this._actor) {

            //禁用攻击指令
            if (BMCL.params.isShow_AttackCommand != 'Disable') {
                this.addAttackCommand();
            }

            //禁用防御指令
            if (BMCL.params.isShow_DefendCommand != 'Disable') {
                this.addGuardCommand();
            }

            //禁用技能指令
            if (BMCL.params.isShow_SkillsCommand != 'Disable') {
                this.addSkillCommands();
            }

            //禁用物品指令
            if (BMCL.params.isShow_ItemsCommand  != 'Disable') {
                this.addItemCommand();
            }
        }
    }

    /**
     * 符文，道具共用一个槽
     */

    // 关闭 槽ID必须和物品ID对应的检查
    Game_Actor.prototype.refresh = function () {
        // this.releaseUnequippableItems(false);
        Game_Battler.prototype.refresh.call(this);
    };
    // 同上，不过这个和数值修正有关，关掉过程数值才是正确的
    Game_Actor.prototype.forceChangeEquip = function (slotId, item) {
        this._equips[slotId].setObject(item);
        // this.releaseUnequippableItems(true);
        this.refresh();
    };

    // 过程数值修正
    Window_EquipStatus.prototype.drawNewParam = function (x, y, paramId) {
        var newValue = this._tempActor.param(paramId);
        var diffvalue = newValue - this._actor.param(paramId);
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(newValue, x, y, 48, 'right');
    };


    // 修改slot名字，屏蔽掉:后的内容
    Window_EquipSlot.prototype.slotName = function (index) {
        var slots = this._actor.equipSlots();
        return this._actor ? $dataSystem.equipTypes[slots[index]].split(":")[0] : '';
    };


    var Window_EquipItem_SlotName = Window_EquipItem.prototype.slotName;
    Window_EquipItem.prototype.slotName = function (index) {
        var slots = this._actor.equipSlots();
        return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
    };

    Window_EquipItem.prototype.includes = function (item) {
        if (item === null) {
            return true;
        }

        var equipTypesTeam = [];
        $dataSystem.equipTypes.forEach(function (type, slotId) {
            if (type.split(":")[1]) {

                var name = type.split(":")[1];

                var team = equipTypesTeam.find(function (team) {
                    return team.name === name
                })
                if (team) {
                    team.member.push(slotId)
                } else {
                    equipTypesTeam.push({
                        name: name,
                        member: [slotId]
                    })
                }
            }
        })


        var teamName = this.slotName(this._slotId) ? this.slotName(this._slotId).split(":")[1] : null;
        var condition = item.etypeId !== this._actor.equipSlots()[this._slotId]
        if (teamName) {
            var team = equipTypesTeam.find(function (team) {
                return team.name === teamName
            })
            condition = !team.member.some(function (m) { return m == item.etypeId })
        }
        if (this._slotId < 0 || condition) {
            return false;
        }
        return this._actor.canEquip(item);
    };


})()