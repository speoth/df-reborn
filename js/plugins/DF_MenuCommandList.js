(function () {

    //=============================================================================
    /*:
    * @plugindesc DF通用脚本 - 菜单屏蔽
    * @author 明火暗雷、菌丝
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
    * @desc  是否禁用【技能】指令，如果值为“Disable”则在主菜单界面不显示【技能】指令，其余任何值都会使【技能】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isEquipsDisable
    * @desc  是否禁用【装备】指令，如果值为“Disable”则在主菜单界面不显示【装备】指令，其余任何值都会使【装备】指令显示出来。
    * @default Disable
    * 
    * @param MainMenu_isMemoryDisable
    * @desc  是否禁用【记忆】指令，如果值为“Disable”则在主菜单界面不显示【记忆】指令，其余任何值都会使【记忆】指令显示出来。
    * @default Disable
    * 
    * @param MainMenu_isStatusDisable
    * @desc  是否禁用【状态】指令，如果值为“Disable”则在主菜单界面不显示【状态】指令，其余任何值都会使【状态】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isFormatDisable
    * @desc  是否禁用【整队】指令，如果值为“Disable”则在主菜单界面不显示【整队】指令，其余任何值都会使【整队】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isOptionDisable
    * @desc  是否禁用【选项】指令，如果值为“Disable”则在主菜单界面不显示【选项】指令，其余任何值都会使【选项】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isSaveDisable
    * @desc  是否禁用【存档】指令，如果值为“Disable”则在主菜单界面不显示【存档】指令，其余任何值都会使【存档】指令显示出来。
    * @default Disable
    *
    * @param MainMenu_isEndDisable
    * @desc  是否禁用【结束】指令，如果值为“Disable”则在主菜单界面不显示【结束】指令，其余任何值都会使【结束】指令显示出来。
    * @default Disable
    * 
    * 
    *
    * ============================  物品目录指令 ============================ *
    *
    * @param ItemCategory_isItemDisable
    * @desc  是否禁用【物品】指令，如果值为“Disable”则在物品目录界面不显示【物品】指令，其余任何值都会使【物品】指令显示出来。
    * @default Disable
    * 
    * @param ItemCategory_isWeaponDisable
    * @desc  是否禁用【武器】指令，如果值为“Disable”则在物品目录界面不显示【武器】指令，其余任何值都会使【武器】指令显示出来。
    * @default Disable
    * 
    * @param ItemCategory_isArmorDisable
    * @desc  是否禁用【防具】指令，如果值为“Disable”则在物品目录界面不显示【防具】指令，其余任何值都会使【防具】指令显示出来。
    * @default Disable
    * 
    * @param ItemCategory_isKeyItemDisable
    * @desc  是否禁用【关键道具】指令，如果值为“Disable”则在物品目录界面不显示【关键道具】指令，其余任何值都会使【关键道具】指令显示出来。
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


    var MCL = MCL || {};

    MCL.MainParams = MCL.BattleParams || {};
    MCL.BattleParams = MCL.BattleParams || {};

    //找到插件脚本
    MCL.parameters = PluginManager.parameters('DF_MenuCommandList');

    //主菜单 - 传参
    MCL.MainParams.isShow_Items     = MCL.parameters['MainMenu_isItemsDisable'      ];
    MCL.MainParams.isShow_Skills    = MCL.parameters['MainMenu_isSkillsDisable'     ];
    MCL.MainParams.isShow_Equips    = MCL.parameters['MainMenu_isEquipsDisable'     ];
    MCL.MainParams.isShow_Status    = MCL.parameters['MainMenu_isStatusDisable'     ];
    MCL.MainParams.isShow_Format    = MCL.parameters['MainMenu_isFormatDisable'     ];
    MCL.MainParams.isShow_Option    = MCL.parameters['MainMenu_isOptionDisable'     ];
    MCL.MainParams.isShow_Save      = MCL.parameters['MainMenu_isSaveDisable'       ];
    MCL.MainParams.isShow_End       = MCL.parameters['MainMenu_isEndDisable'        ];
    MCL.MainParams.isShow_Memory    = MCL.parameters['MainMenu_isMemoryDisable'     ];

    //物品目录 - 传参
    MCL.MainParams.isShow_Category_Item     = MCL.parameters['ItemCategory_isItemDisable'   ];
    MCL.MainParams.isShow_Category_Weapon   = MCL.parameters['ItemCategory_isWeaponDisable' ];
    MCL.MainParams.isShow_Category_Armor    = MCL.parameters['ItemCategory_isArmorDisable'  ];
    MCL.MainParams.isShow_Category_KeyItem  = MCL.parameters['ItemCategory_isKeyItemDisable'];


    //战斗菜单 - 传参
    MCL.BattleParams.isShow_Attack  = MCL.parameters['BattleMenu_isAttackDisable'   ];
    MCL.BattleParams.isShow_Defend  = MCL.parameters['BattleMenu_isDefendDisable'   ];
    MCL.BattleParams.isShow_Skills  = MCL.parameters['BattleMenu_isSkillsDisable'   ];
    MCL.BattleParams.isShow_Items   = MCL.parameters['BattleMenu_isItemsDisable'    ];

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

        //禁用记忆
        if (MCL.MainParams.isShow_Memory != 'Disable') {
            this.addMemoryCommands();
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

    };


    /*
    * 改写ItemCategory，判断制作物品目录的时候是否调用原有方法。
    */
    Window_ItemCategory.prototype.makeCommandList = function () {

        //禁用物品目录 - 物品
        if (MCL.MainParams.isShow_Category_Item != 'Disable') {
            this.addCommand(TextManager.item, 'item');
        }

        //禁用物品目录 - 武器
        if (MCL.MainParams.isShow_Category_Weapon != 'Disable') {
            this.addCommand(TextManager.weapon, 'weapon');
        }

        //禁用物品目录 - 防具
        if (MCL.MainParams.isShow_Category_Armor != 'Disable') {
            this.addCommand(TextManager.armor, 'armor');
        }

        //禁用物品目录 - 关键道具
        if (MCL.MainParams.isShow_Category_KeyItem != 'Disable') {
            this.addCommand(TextManager.keyItem, 'keyItem');
        }

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






	/*
	*===========================================================
	*--------------------这里是新加按钮的代码---------------------
	*===========================================================
    * 新增按钮方法：
    * step1 - 在data/system.json里，找到command，在最后添加要添加的按钮名称的字段
    * step2 - 在js/rpg_manader里，找到Object.defineProperties，在command处按照格式加一个成员
    * step3 - 按照下述方法，定义一个新的按钮
    * step4 - 调用Window_MenuCommand.prototype新定义的方法即可使用
	*/

    /*
	*=======================新增按钮：记忆========================
	*/

	Window_MenuCommand.prototype.addMemoryCommands = function () {
        var enabled = this.isMemoryEnabled();
        this.addCommand(TextManager.memory, 'memory', enabled);
	}

    //修改enable变量
    Window_MenuCommand.prototype.isMemoryEnabled = function () {
        return true;
    };












})()