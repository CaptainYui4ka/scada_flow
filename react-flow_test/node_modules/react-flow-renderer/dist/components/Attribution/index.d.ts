/// <reference types="react" />
import { AttributionPosition, ProOptions } from '../../types';
declare type AttributionProps = {
    pro?: ProOptions;
    position?: AttributionPosition;
};
declare function Attribution({ pro, position }: AttributionProps): JSX.Element | null;
export default Attribution;
