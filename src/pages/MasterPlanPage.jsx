import { Eyebrow } from '../components/common/UI';
import MasterPlanExplorer from '../components/masterplan/MasterPlanExplorer';

export default function MasterPlanPage() {
  return (
    <main className="master-plan-page royal-leather-main">
      <section className="page-hero">
        <div className="container">
          <Eyebrow light>INTERACTIVE CADASTRAL EXPLORER</Eyebrow>
          <h1>Project Master <em>Plans.</em></h1>
          <p>Explore legally approved sector layouts, 60ft–80ft road network avenues, green park buffers, and individual plot dimensions in real-time.</p>
        </div>
      </section>

      <section className="section" style={{ background: 'transparent' }}>
        <div className="container">
          <MasterPlanExplorer />
        </div>
      </section>
    </main>
  );
}
