export class Room {
  private id: string;
  private owner: string;
  private members: string[];

  public constructor(id: string, owner: string) {
    this.id = id;
    this.owner = owner;
    this.members = [owner];
  }

  public addMember(member: string) {
    if (this.members.length < 2) {
      this.members.push(member);
    }
  }

  public getId() {
    return this.id;
  }

  public getOwner() {
    return this.owner;
  }

  public getMembers() {
    return this.members;
  }
}
