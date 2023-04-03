class UserDto {
    constructor(entity) {
        this.id = entity.id;
        this.name = entity.name;
        this.surname = entity.name;
        this.email = entity.email;
        this.avatar = entity.avatar;
        this.birthday = entity.birthday;
        this.isMale = entity.birthday;
        this.isActivated = entity.isActivated;
    }
}

module.exports = { UserDto };
