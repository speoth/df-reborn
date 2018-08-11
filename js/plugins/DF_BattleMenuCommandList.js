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

    BMCL.params = BMCL.params || {};
    BMCL.parameters = PluginManager.parameters('DF_BattleMenuCommandList');

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



})()