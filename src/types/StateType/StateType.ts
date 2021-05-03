import { Asset, User } from '@/models';

interface StateType {
  Assets: {
    asset: Asset | null;
  };
  Auth: {
    user: User | null;
    loading: boolean;
  };
  route: {
    params?: {
      assetId?: string;
    };
  };
}

export default StateType;
