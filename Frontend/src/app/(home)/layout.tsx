import { Sidebar, TopMenu } from '@/components';
import AuthMessage from '@/components/ui/error/AuthMessage';

export default function ShopLayout( { children }: {
  children: React.ReactNode;
} ) {
  return (
    <main className="min-h-screen ">

      <TopMenu />
{/*       <Sidebar /> */}

      <div className="px-0 sm:px-10">
       
        { children }

      </div>

    </main>
  );
}