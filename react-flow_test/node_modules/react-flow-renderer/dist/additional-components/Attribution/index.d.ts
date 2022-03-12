/// <reference types="react" />
import { AttributionPosition } from '../../types';
declare type AttributionProps = {
    account?: string;
    position?: AttributionPosition;
};
declare function Attribution({ account, position }: AttributionProps): JSX.Element | null;
export default Attribution;
