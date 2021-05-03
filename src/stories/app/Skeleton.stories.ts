import { TemplateInterface } from '@/types';
import { Skeleton } from '@/components/app';

export default {
  title: 'app/Skeleton',
  component: Skeleton,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Skeleton },
  template: `
    <Skeleton :loading="loading">
      <div>
        <h2>Example</h2>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
          sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
          no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
          consetetur sadipscing elitr,
          sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren,
          no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div>
    </Skeleton>
  `,
});

export const Example = Template.bind({});

Example.args = { loading: true };
