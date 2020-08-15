import { _decorator, Component, Node, SkeletalAnimationComponent, AnimationClip, AnimationComponent, AnimationState, Vec3, Quat } from 'cc';
const { ccclass, property } = _decorator;

const dir = new Vec3();
const rot = new Quat();

@ccclass('CompanySuit')
export class CompanySuit extends Component {

    animComp: SkeletalAnimationComponent;

    _interactFinished = true;

    start () {
        this.animComp = this.node.getComponent(SkeletalAnimationComponent);
        this.animComp.getState('Root|Interact_standing').wrapMode = AnimationClip.WrapMode.Normal;
        this.animComp.on(AnimationComponent.EventType.FINISHED, (type: AnimationComponent.EventType, state: AnimationState) => {
            if (!this._interactFinished && state.name === 'Root|Interact_standing') {
                this.animComp.crossFade('Root|Idle');
                this._interactFinished = true;
            }
        });
    }

    handWaving (position: Vec3) {
        this.node.setRotation(Quat.fromViewUp(rot, Vec3.normalize(dir, position)));
        if (this._interactFinished) {
            this.animComp.crossFade('Root|Interact_standing');
            this._interactFinished = false;
        }
    }
}