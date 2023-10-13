export function getUsersWithRoles(users, roles) {
    return users.filter(user =>
        roles.some(role => user.roles.some(r => r.name === role)) &&
        !user.roles.some(r => r.name === 'ADMIN')
    );
}

