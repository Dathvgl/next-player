type SkillProps = {
  title: string;
  description: string;
  cooldown: number;
  duration: number;
};

export class Skill {
  title: string;
  description: string;
  cooldown: number;
  duration: number;

  power?: number;
  radius?: number;
  effect?: number;

  constructor(props: SkillProps) {
    this.title = props.title;
    this.description = props.description;
    this.cooldown = props.cooldown;
    this.duration = props.duration;
  }
}
