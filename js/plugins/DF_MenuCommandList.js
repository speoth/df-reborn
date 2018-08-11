(function () {

    //=============================================================================
    /*:
    * @plugindesc DF通用脚本 - 菜单屏蔽
    * @author 明火暗雷
    *
    * ============================  战斗菜单指令 ============================ *
    *
    * @param BattleMenu_isAttackDisable
    * @desc  是否禁用【攻击】指令，如果值为“Disable”则在战斗菜单界面不显示【攻击】指令，其余任何值都会使【攻击】指令显示出来。
    * @default Disable
    *
    * @param BattleMenu_isDefendDisable
    * @desc  是否禁用【防御】指令，如果值为“Disable”则在战斗菜单界面不显示【防御】指令，其余任何值都会使【防御】指令显示出来。
    * @default Disable
    *
    * @param BattleMenu_isSkillsDisable
    * @desc  是否禁用【技能】指令，如果值为“Disable”则在战斗菜单界面不显示【技能】指令，其余任何值都会使【技能】指令显示出来。
    * @default Disable
    *
    * @param BattleMenu_isItemsDisable
    * @desc  是否禁用【物品】指令，如果值为“Disable”则在战斗菜单界面不显示【物品】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
    *
    * ============================  主菜单指令 ============================ *
    *
    * @param MainMenu_isItemsDisable
    * @desc  是否禁用【物品】指令，如果值为“Disable”则在主菜单界面不显示【物品】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isSkillsDisable
    * @desc  是否禁用【技能】指令，如果值为“Disable”则在主菜单界面不显示【技能】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isEquipsDisable
    * @desc  是否禁用【装备】指令，如果值为“Disable”则在主菜单界面不显示【装备】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isStatusDisable
    * @desc  是否禁用【状态】指令，如果值为“Disable”则在主菜单界面不显示【状态】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isFormatDisable
    * @desc  是否禁用【整队】指令，如果值为“Disable”则在主菜单界面不显示【整队】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isOptionDisable
    * @desc  是否禁用【选项】指令，如果值为“Disable”则在主菜单界面不显示【选项】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isSaveDisable
    * @desc  是否禁用【存档】指令，如果值为“Disable”则在主菜单界面不显示【存档】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isEndDisable
    * @desc  是否禁用【结束】指令，如果值为“Disable”则在主菜单界面不显示【结束】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
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


    var MCL = MCL || {};

    MCL.MainParams = MCL.BattleParams || {};
    MCL.BattleParams = MCL.BattleParams || {};

    MCL.parameters = PluginManager.parameters('DF_MenuCommandList');

    //主菜单 - 传参
    MCL.MainParams.isShow_Items  = MCL.parameters['MainMenu_isItemsDisable' ];
    MCL.MainParams.isShow_Skills = MCL.parameters['MainMenu_isSkillsDisable'];
    MCL.MainParams.isShow_Equips = MCL.parameters['MainMenu_isEquipsDisable'];
    MCL.MainParams.isShow_Status = MCL.parameters['MainMenu_isStatusDisable'];
    MCL.MainParams.isShow_Format = MCL.parameters['MainMenu_isFormatDisable'];
    MCL.MainParams.isShow_Option = MCL.parameters['MainMenu_isOptionDisable'];
    MCL.MainParams.isShow_Save   = MCL.parameters['MainMenu_isSaveDisable'  ];
    MCL.MainParams.isShow_End    = MCL.parameters['MainMenu_isEndDisable'   ];

    //战斗菜单 - 传参
    MCL.BattleParams.isShow_Attack = MCL.parameters['BattleMenu_isAttackDisable'];
    MCL.BattleParams.isShow_Defend = MCL.parameters['BattleMenu_isDefendDisable'];
    MCL.BattleParams.isShow_Skills = MCL.parameters['BattleMenu_isSkillsDisable'];
    MCL.BattleParams.isShow_Items  = MCL.parameters['BattleMenu_isItemsDisable' ];

    /*
    * 改写MenuCommand，判断制作主菜单的时候是否调用原有方法。
    */
    Window_MenuCommand.prototype.makeCommandList = function () {

        //禁用物品
        if (MCL.MainParams.isShow_Items != 'Disable') {
            this.addItemsCommands();
        }

        //禁用技能
        if (MCL.MainParams.isShow_Skills != 'Disable') {
            this.addSkillsCommands();
        }

        //禁用装备
        if (MCL.MainParams.isShow_Equips != 'Disable') {
            this.addEquipCommands();
        }

        //禁用状态
        if (MCL.MainParams.isShow_Status != 'Disable') {
            this.addStatusCommands();
        }

        //禁用整队
        if (MCL.MainParams.isShow_Format != 'Disable') {
            this.addFormationCommand();
        }

        //禁用选项
        if (MCL.MainParams.isShow_Option != 'Disable') {
            this.addOptionsCommand();
        }
        
        //禁用保存
        if (MCL.MainParams.isShow_Save != 'Disable') {
            this.addSaveCommand();
        }

        //禁用退出
        if (MCL.MainParams.isShow_End != 'Disable') {
            this.addGameEndCommand();
        }


        //这是留给新功能的位置
        //this.addOriginalCommands();
    };

    /*
     * 修改ActorCommand，判断制作战斗命令菜单的时候是否调用原有方法。
     */
    Window_ActorCommand.prototype.makeCommandList = function () {
        if (this._actor) {

            //禁用攻击指令
            if (MCL.BattleParams.isShow_Attack != 'Disable') {
                this.addAttackCommand();
            }

            //禁用防御指令
            if (MCL.BattleParams.isShow_Defend != 'Disable') {
                this.addGuardCommand();
            }

            //禁用技能指令
            if (MCL.BattleParams.isShow_Skills != 'Disable') {
                this.addSkillCommands();
            }

            //禁用物品指令
            if (MCL.BattleParams.isShow_Items != 'Disable') {
                this.addItemCommand();
            }
        }
    }






})()