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

})()