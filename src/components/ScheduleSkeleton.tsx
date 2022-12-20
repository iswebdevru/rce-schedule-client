import { repeat } from '../utils';
import Container from './Container';

function Cell() {
  return <div className="h-6 animate-pulse bg-gray-300 rounded-md"></div>;
}

export function ScheduleSkeleton({ count = 1 }: { count?: number }) {
  return (
    <Container>
      <div className="flex flex-wrap flex-auto">
        {repeat(
          count,
          <table className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <tbody className="border border-gray-400 relative">
              <tr>
                <th className="p-2 border border-gray-400" colSpan={3}>
                  <Cell />
                </th>
              </tr>
              <tr>
                <td className="p-2 border border-gray-400" colSpan={2}>
                  <Cell />
                </td>
                <td className="p-2 border border-gray-400">
                  <Cell />
                </td>
              </tr>
              {repeat(
                6,
                <tr>
                  <td className="p-2 w-1/12 border border-gray-400">
                    <Cell />
                  </td>
                  <td className="p-2 w-9/12 border border-gray-400">
                    <Cell />
                  </td>
                  <td className="p-2 w-2/12 border border-gray-400">
                    <Cell />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
}
